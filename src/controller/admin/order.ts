import { Request, Response } from "express";
import "reflect-metadata";
import OrderService from "../../service/order";

export const getOrders = async (req: Request, res: Response) => {
  const status = req.query.status as string | string[];
  const keyword = req.query.keyword as string;
  const page = req.query.page as string;

  const orders = await OrderService.getOrders({
    keyword,
    page: +page,
    isAdmin: true,
    status,
  });
  const total = (
    await OrderService.getOrders({
      keyword,
      isAdmin: true,
      status,
    })
  ).length;

  return res.send({ orders, total });
};

export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send({ message: "숫자만 사용 가능합니다." });
  }

  const order = await OrderService.getOrder({
    id: +id,
    isAdmin: true,
  });
  if (!order) {
    return res.status(400).send({ message: "주문 번호를 다시 확인해 주세요." });
  }

  return res.send(order);
};

export const patchOrderIsRefund = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isRefund } = req.body;

  const refund = await OrderService.patchOrderIsRefund({
    orderId: +id,
    isRefund,
  });
  if (refund.success) {
    return res.send(refund);
  }

  return res.status(400).send(refund);
};
