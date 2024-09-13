import "reflect-metadata";
import { Order, OrderStatusLog, User } from "../entity";
import { checkOrderNumber, getDatesByStatus } from "../helper/order";
import { getRepository } from "typeorm";
import OrderStatusLogService from "./orderStatusLog";
import OrderProductService from "./orderProduct";
import ProductService from "./product";

const OrderService = {
  createOrder: async ({ userId }: { userId: User }) => {
    const orderNumber = await checkOrderNumber();

    const order = new Order();
    order.user = userId;
    order.orderNumber = orderNumber;

    await Order.save(order);

    return order;
  },

  putOrder: async ({
    shippingAddressJson,
    refundJson,
    orderId,
    userId,
    payMethod,
  }: {
    shippingAddressJson: string;
    refundJson?: string;
    orderId: number;
    userId: number;
    payMethod?: string;
  }) => {
    await getRepository(Order)
      .createQueryBuilder()
      .update(Order)
      .set({ shippingAddressJson, refundJson, payMethod })
      .where("id = :orderId", { orderId })
      .andWhere("userId = :userId", { userId })
      .execute();
  },

  putKSPayPGUniqueIdToOrder: async ({
    shippingAddressJson,
    status,
    payMethod,
    payAmount,
    userId,
    orderId,
    pgUniqueId,
  }: {
    shippingAddressJson: string;
    status: string;
    payMethod: string;
    payAmount: number;
    userId: number;
    orderId: number;
    pgUniqueId: string;
  }) => {
    const orderProducts = await OrderProductService.getOrderProducts({
      orderId,
      userId,
    });

    const promises = orderProducts.map(async (orderProduct) => {
      const promise = async () => {
        const product = await ProductService.getProduct({
          id: orderProduct.product.id,
        });
        await OrderProductService.putOrderProduct({
          productData: JSON.stringify(product),
          orderId,
          productId: orderProduct.product.id,
        });
      };
      return promise();
    });
    await Promise.all(promises);

    await getRepository(Order)
      .createQueryBuilder()
      .update(Order)
      .set({
        shippingAddressJson: JSON.stringify(shippingAddressJson),
        status: status,
        payMethod: payMethod,
        payAmount: payAmount,
        pgUniqueId: pgUniqueId,
        pgCompany: "KSPAY",
      })
      .where("id = :orderId", { orderId })
      .execute();

    await OrderStatusLogService.postOrderStatus({
      orderId,
      status: "결제완료",
    });
    await getRepository(Order)
      .createQueryBuilder()
      .update(Order)
      .set({})
      .where("id = :orderId", { orderId })
      .execute();
  },

  deleteOrder: async () => {},

  getOrders: async ({
    userId,
    isAdmin,
    keyword,
    page,
    status,
    payMethod,
  }: {
    userId?: User;
    isAdmin?: boolean;
    keyword?: string;
    page?: number;
    status?: string[] | string;
    payMethod?: string;
  }) => {
    const count = 15;

    const orderList = getRepository(Order)
      .createQueryBuilder("order")
      .leftJoin("order.user", "user")
      .leftJoinAndSelect("order.shipment", "shipment")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .leftJoinAndSelect("product.productPrices", "productPrices")
      .leftJoinAndSelect("order.orderStatusLog", "orderStatusLog")
      .leftJoinAndSelect("order.currentStatus", "currentStatus")
      .select([
        "order",
        "user.id",
        "user.name",
        "user.phoneNumber",
        "user.email",
        "user.status",
        "user.isAdmin",
        "user.created_at",
        "shipment",
        "orderProducts",
        "product",
        "productPrices",
        "orderStatusLog",
        "currentStatus",
      ])
      .where(
        `(currentStatus.orderId, currentStatus.createdAt) IN
      (
        SELECT
         currentStatus.orderId,
          max(currentStatus.createdAt) AS createdAt
        FROM order_status_log AS currentStatus
        GROUP BY currentStatus.orderId
        )`
      )
      .andWhere("currentStatus.status != '결제대기'");

    if (status?.length > 0) {
      if (typeof status === "object") {
        orderList.andWhere("currentStatus.status IN (:...status)", {
          status,
        });
      } else if (typeof status === "string") {
        orderList.andWhere("currentStatus.status = :status", { status });
      }
    }
    if (!isAdmin) {
      orderList.andWhere("user.id = :userId", { userId });
    }
    if (keyword) {
      orderList.andWhere(
        `user.name LIKE '%${keyword}%' OR user.phoneNumber LIKE '%${keyword}%' OR user.email LIKE '%${keyword}%'`
      );
    }
    if (payMethod) {
      orderList.andWhere("order.payMethod = :payMethod", { payMethod });
    }
    if (page) {
      orderList.skip((page - 1) * count).take(count);
    }
    const orders = await orderList
      .orderBy("order.id", "DESC")
      .addOrderBy("orderStatusLog.createdAt", "DESC")
      .getMany();

    const results = orders.map((order) => {
      const statusDates = getDatesByStatus(order.orderStatusLog);

      delete order.orderStatusLog;

      return {
        ...order,
        statusDates,
      };
    });

    return results;
  },

  getOrder: async ({
    id,
    userId,
    isAdmin,
    orderNumber,
  }: {
    id?: number;
    userId?: number;
    isAdmin?: boolean;
    orderNumber?: string;
  }) => {
    if (orderNumber) {
      const orderByNumber = await getRepository(Order)
        .createQueryBuilder()
        .where("orderNumber = :orderNumber", { orderNumber })
        .getOne();

      if (!orderByNumber) {
        return false;
      }
    } else {
      const order = await OrderService.getOrderById({ orderId: id });
      if (!order) {
        return false;
      }
    }

    const oneOrder = getRepository(Order)
      .createQueryBuilder("order")
      .leftJoin("order.user", "user")
      .leftJoinAndSelect("order.shipment", "shipment")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .leftJoinAndSelect("product.productPrices", "productPrices")
      .leftJoinAndSelect("order.orderStatusLog", "orderStatusLog")
      .leftJoinAndSelect("order.currentStatus", "currentStatus")
      .select([
        "order",
        "user.id",
        "user.name",
        "user.phoneNumber",
        "user.email",
        "user.status",
        "user.isAdmin",
        "user.created_at",
        "shipment",
        "orderProducts",
        "product",
        "productPrices",
        "currentStatus",
        "orderStatusLog",
      ])
      .where(
        `(currentStatus.orderId, currentStatus.createdAt) IN
      (
        SELECT
         currentStatus.orderId,
          max(currentStatus.createdAt) AS createdAt
        FROM order_status_log AS currentStatus
        GROUP BY currentStatus.orderId
        )`
      );
    if (id) {
      oneOrder.andWhere("order.id = :id", { id });
    }
    if (orderNumber) {
      oneOrder.andWhere("order.orderNumber = :orderNumber", { orderNumber });
    }
    if (!isAdmin) {
      oneOrder.andWhere("user.id = :userId", { userId });
    }

    const order = await oneOrder
      .orderBy("orderStatusLog.createdAt", "DESC")
      .getOne();

    const statusDates = getDatesByStatus(order.orderStatusLog);

    delete order.orderStatusLog;

    return { ...order, statusDates };
  },

  getOrderById: async ({ orderId }: { orderId: number }) => {
    const order = await getRepository(Order)
      .createQueryBuilder()
      .where("id = :orderId", { orderId })
      .getOne();

    return order;
  },

  getOrderByOrderNumber: async ({ orderNumber }: { orderNumber: number }) => {
    console.log(`전달받은 orderNumber : ${orderNumber}`);
    const order = await getRepository(Order)
      .createQueryBuilder()
      .where("orderNumber = :orderNumber", { orderNumber: orderNumber })
      .getOne();

    return order;
  },

  getOrderStandBy: async ({
    userId,
    orderNumber,
  }: {
    userId: number;
    orderNumber: string;
  }) => {
    const order = await getRepository(Order)
      .createQueryBuilder("order")
      .leftJoin("order.orderStatusLog", "orderStatusLog")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .leftJoinAndSelect("product.productPrices", "productPrices")
      .where("order.userId = :userId", { userId })
      .andWhere(`orderStatusLog.status = '결제대기'`)
      .andWhere("order.orderNumber = :orderNumber", { orderNumber })
      .getOne();

    return order;
  },

  onVbankOrderDone: async ({
    userId,
    orderId,
    payAmount,
  }: {
    userId: number;
    orderId: number;
    payAmount: number;
  }) => {
    await OrderStatusLogService.postOrderStatus({
      orderId,
      status: "주문완료",
    });
    const orderProducts = await OrderProductService.getOrderProducts({
      orderId,
      userId,
    });

    await getRepository(Order)
      .createQueryBuilder()
      .update(Order)
      .set({ payAmount })
      .where("id = :orderId", { orderId })
      .execute();

    const promises = orderProducts.map(async (orderProduct) => {
      const promise = async () => {
        const product = await ProductService.getProduct({
          id: orderProduct.product.id,
        });
        await OrderProductService.putOrderProduct({
          productData: JSON.stringify(product),
          orderId,
          productId: orderProduct.product.id,
        });
      };
      return promise();
    });
    await Promise.all(promises);
  },

  onIamportOrderDone: async ({
    status,
    payMethod,
    orderId,
    payAmount,
    userId,
  }) => {
    const orderProducts = await OrderProductService.getOrderProducts({
      orderId,
      userId,
    });

    const promises = orderProducts.map(async (orderProduct) => {
      const promise = async () => {
        const product = await ProductService.getProduct({
          id: orderProduct.product.id,
        });
        await OrderProductService.putOrderProduct({
          productData: JSON.stringify(product),
          orderId,
          productId: orderProduct.product.id,
        });
      };
      return promise();
    });
    await Promise.all(promises);

    await getRepository(Order)
      .createQueryBuilder()
      .update(Order)
      .set({ status, payMethod, payAmount })
      .where("id = :orderId", { orderId })
      .execute();

    await OrderStatusLogService.postOrderStatus({
      orderId,
      status: "결제완료",
    });
  },

  patchOrderIsRefund: async ({
    orderId,
    isRefund,
  }: {
    orderId: number;
    isRefund: boolean;
  }) => {
    const order = await OrderService.getOrderById({ orderId });
    if (!order) {
      return { success: false, message: "order를 다시 확인해주세요." };
    }

    await getRepository(Order)
      .createQueryBuilder()
      .update(Order)
      .set({ isRefund })
      .where("id = :orderId", { orderId })
      .execute();

    return { success: true };
  },
};

export default OrderService;
