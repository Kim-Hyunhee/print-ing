import "reflect-metadata";
import { OrderStatusLog } from "../entity";
import OrderService from "./order";
import { getRepository } from "typeorm";

const OrderStatusLogService = {
  postOrderStatus: async ({
    orderId,
    status,
  }: {
    orderId: number;
    status: string;
  }) => {
    const order = await OrderService.getOrderById({ orderId });
    if (!order) {
      return false;
    }

    const orderStatus = new OrderStatusLog();
    orderStatus.status = status;
    orderStatus.order = order;

    const orderStatusItem = await OrderStatusLog.save(orderStatus);

    return orderStatusItem;
  },

  getManyOrderStatus: async () => {
    const statusList = ["결제완료", "제작중", "배송중", "배송완료"];

    return await getRepository(OrderStatusLog)
      .createQueryBuilder("statusLog")
      .leftJoinAndSelect("statusLog.order", "order")
      .leftJoin("statusLog.orderProduct", "orderProduct")
      .leftJoin("orderProduct.product", "product")
      .where("statusLog.status IN (:statusList)", { statusList })
      .andWhere(
        `statusLog.createdAt = (SELECT MAX(subStatusLog.createdAt) 
          FROM order_status_log subStatusLog WHERE subStatusLog.orderId = statusLog.orderId)`
      )
      .getMany();
  },
};
export default OrderStatusLogService;
