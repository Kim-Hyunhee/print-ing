import { Request, Response } from "express";
import KspayService from "../service/kspay";
import OrderService from "../service/order";
import ShippingAddressService from "../service/shippingAddress";

export const postKsnetPayment = async (req: Request, res: Response) => {
  const {
    orderNumber,
    userName,
    userEmail,
    productName,
    totalAmount,
    cardNumb,
    expiryDate,
    installMonth,
    password2,
    userInfo,
    shippingAddressId,
    isSaveShippingAddress,
    shippingAddress,
  } = req.body;
  const userId = res.locals.decoded.userId;
  console.log(`오더번호 : ${orderNumber}`);

  const order = await OrderService.getOrderByOrderNumber({
    orderNumber: orderNumber,
  });

  if (order) {
    console.log(`order JSON : ${JSON.stringify(order)}`);

    const paymentData = await KspayService.postCertPayment({
      orderId: orderNumber,
      userName,
      userEmail,
      productName,
      totalAmount,
      cardNumb,
      expiryDate,
      installMonth,
      password2,
      userInfo,
    });

    if (paymentData.message === "Success") {
      const shippingAddressJson =
        shippingAddressId !== 0
          ? await ShippingAddressService.getShippingAddress({
              id: shippingAddressId,
              userId,
            })
          : shippingAddress;

      await OrderService.putKSPayPGUniqueIdToOrder({
        shippingAddressJson: shippingAddressJson,
        status: "paid",
        payMethod: "creditCard",
        payAmount: totalAmount,
        userId: userId,
        orderId: order.id,
        pgUniqueId: paymentData.data.tid,
      });

      if (shippingAddressId === 0 && isSaveShippingAddress) {
        await ShippingAddressService.createShippingAddress({
          userId,
          ...shippingAddress,
        });
      }
      return res.send({
        status: paymentData.status,
        message: paymentData.message,
        data: paymentData.data,
      });
    } else {
      return res.status(400).send({
        status: 400,
        message: `payment fail`,
      });
    }
  } else {
    return res.status(400).send({
      status: 400,
      message: `there's no order number`,
    });
  }
};

export const postKsnetCardCheck = async (req: Request, res: Response) => {
  const {
    orderNumber,
    userName,
    productName,
    totalAmount,
    password2,
    userInfo,
  } = req.body;
  console.log(JSON.stringify(req.body, null, 2));

  const cardCheckData = await KspayService.postCardOwnerCheck({
    orderId: orderNumber,
    userName,
    productName,
    totalAmount,
    password2,
    userInfo,
  });

  return res.send({
    status: cardCheckData.status,
    message: cardCheckData.message,
    data: cardCheckData.data,
  });
};

export const postKsnetCardCancel = async (req: Request, res: Response) => {
  const { orderNumber, cancelType, cancelTotalAmount, cancelSeq } = req.body;

  const loginUser = res.locals.decoded;

  const order = await OrderService.getOrderByOrderNumber({
    orderNumber: orderNumber,
  });

  if (order) {
    if (order.userId !== loginUser.userId) {
      if (!loginUser.isAdmin) {
        return res.send({
          status: 400,
          message: "일반 사용자는 자신이 주문한 내역만 취소 가능합니다.",
          data: null,
        });
      }
    }

    const cardPayCancelData = await KspayService.postCardCancel({
      cancelType: cancelType,
      orgTradeKey: order.pgUniqueId,
      cancelTotalAmount,
      cancelSeq,
    });

    return res.send({
      status: cardPayCancelData.status,
      message: cardPayCancelData.message,
      data: cardPayCancelData.data,
    });
  } else {
    return res.send({
      status: 400,
      message: "해당 orderNumber를 가진 주문이 없습니다.",
      data: null,
    });
  }
};
