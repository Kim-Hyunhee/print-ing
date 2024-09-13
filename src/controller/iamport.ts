import { Request, Response } from "express";
import IamPortService from "../service/iamport";
import OrderService from "../service/order";
import { getTotalAmount } from "../helper/order";

export const patchIamportOrderComplete = async (
  req: Request,
  res: Response
) => {
  const { imp_uid, merchant_uid } = req.body;
  const userId = res.locals.decoded.userId;

  const paymentData = await IamPortService.getPaymentData({
    imp_uid,
  });
  const order = await OrderService.getOrderStandBy({
    orderNumber: merchant_uid,
    userId,
  });
  if (!order) {
    return res.status(400).send({ message: "결제 가능한 상품이 없습니다." });
  }

  const payAmount = getTotalAmount(order.orderProducts);

  if (paymentData.amount !== payAmount) {
    return res
      .status(400)
      .send({ status: "forgery", message: "위조된 결제 시도" });
  }

  if (paymentData.status !== "paid") {
    return res.status(400).send({ status: "fail", message: "검증 실패" });
  }

  await OrderService.onIamportOrderDone({
    status: paymentData.status,
    payMethod: "creditCard",
    orderId: order.id,
    payAmount,
    userId,
  });

  return res.send({ status: "success", message: "결제 성공" });
};
