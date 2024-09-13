import { Request, Response } from "express";
import "reflect-metadata";
import BankService from "../service/bank";
import ShippingAddressService from "../service/shippingAddress";
import OrderService from "../service/order";
import ShipmentService from "../service/shipment";
import OrderProductService from "../service/orderProduct";
import OrderStatusLogService from "../service/orderStatusLog";
import { getTotalAmount } from "../helper/order";
import ProductService from "../service/product";

export const postOrder = async (req: Request, res: Response) => {
  const { orderProducts } = req.body;
  const userId = res.locals.decoded.userId;

  const order = await OrderService.createOrder({ userId });
  if (!order) {
    return res.status(400).send(false);
  }
  await OrderStatusLogService.postOrderStatus({
    orderId: order.id,
    status: "결제대기",
  });
  await ShipmentService.createShipment({ order });

  const promises = orderProducts.map(async ({ image, productId, amount }) => {
    const product = await ProductService.getProduct({ id: productId });
    if (product.multiple && !(amount % product.multiple === 0)) {
      throw new Error(`${product.multiple}의 배수로 주문 가능합니다.`);
    }

    const results = await OrderProductService.createOrderProduct({
      image,
      amount,
      productId,
      order,
    });
    if (!results.success) {
      throw new Error("이미지를 업로드 해주세요.");
    }
    return results;
  });

  try {
    await Promise.all(promises);

    const orderNumber = order.orderNumber;

    return res.send({ orderNumber });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export const putOrder = async (req: Request, res: Response) => {
  const orderNumber = req.params.orderNumber as string;

  const {
    refundInfo,
    payMethod,
    shippingAddressId,
    isSaveShippingAddress,
    shippingAddress,
  } = req.body;
  const userId = res.locals.decoded.userId;

  const order = await OrderService.getOrderStandBy({
    orderNumber,
    userId,
  });
  if (!order) {
    return res.status(400).send({ message: "주문을 찾을 수 없습니다." });
  }

  const orderId = order.id;

  const shippingAddressJson =
    shippingAddressId !== 0
      ? await ShippingAddressService.getShippingAddress({
          id: shippingAddressId,
          userId,
        })
      : shippingAddress;

  if (shippingAddressId !== 0 && isSaveShippingAddress) {
    await ShippingAddressService.createShippingAddress({
      userId,
      ...shippingAddress,
    });
  }

  let refundJson = {};
  if (payMethod === "bankTransfer") {
    const bank = await BankService.getBank({ id: refundInfo.bankId });
    if (!bank) {
      return res
        .status(400)
        .send({ message: "은행 정보를 다시 확인해주세요." });
    }

    refundJson = {
      ...refundInfo,
      bankName: bank.name,
    };

    const payAmount = getTotalAmount(order.orderProducts);
    await OrderService.onVbankOrderDone({
      orderId,
      userId,
      payAmount,
    });
  }

  await OrderService.putOrder({
    shippingAddressJson: JSON.stringify(shippingAddressJson),
    refundJson: JSON.stringify(refundJson),
    orderId,
    userId,
    payMethod,
  });

  return res.send(true);
};

export const deleteOrder = async () => {
  OrderService.deleteOrder;
};

export const getOrders = async (req: Request, res: Response) => {
  const userId = res.locals.decoded.userId;
  const status = req.query.status as string | string[];

  const orders = await OrderService.getOrders({
    userId,
    status,
  });
  const total = orders.length;

  return res.send({ orders, total });
};

export const getOrder = async (req: Request, res: Response) => {
  const userId = res.locals.decoded.userId;
  const orderNumber = req.params.orderNumber as string;

  const order = await OrderService.getOrder({ userId, orderNumber });
  if (!order) {
    return res.status(400).send({ message: "주문 번호를 다시 확인 해주세요." });
  }

  return res.send(order);
};

export const getOrderStandBy = async (req: Request, res: Response) => {
  const userId = res.locals.decoded.userId;
  const orderNumber = req.query.orderNumber as string;

  const standByOrder = await OrderService.getOrderStandBy({
    userId,
    orderNumber,
  });

  return res.send(standByOrder);
};
