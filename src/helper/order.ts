import { Order, OrderProduct, OrderStatusLog } from "../entity";
import { getRepository } from "typeorm";

export const checkOrderNumber = async () => {
  let flag = true;

  while (flag) {
    const orderNumber = "" + Math.floor(Math.random() * 10000000000);
    const checkOrderNumber = await getRepository(Order).findOne({
      orderNumber,
    });
    if (!checkOrderNumber) {
      flag = false;
    }
    return orderNumber;
  }
};

export const getDatesByStatus = (orderStatusLogs: OrderStatusLog[]) => {
  const statuses = ["환불완료", "취소완료", "주문완료", "결제완료", "제작중"];
  const [refundDate, cancelDate, orderCompleteDate, paymentDate, makingDate] =
    statuses.map((status) => {
      const statusDate =
        orderStatusLogs.find(
          (orderStatusLog) => orderStatusLog.status === status
        )?.createdAt || "";
      return statusDate;
    });

  return {
    refundDate,
    cancelDate,
    orderCompleteDate,
    paymentDate,
    makingDate,
  };
};

export const getTotalAmount = (orderProducts: OrderProduct[]) => {
  const amountToBePaid = orderProducts
    .map((orderProduct) => orderProduct.product.price * orderProduct.amount)
    .reduce((a, b) => a + b, 0);

  return amountToBePaid;
};
