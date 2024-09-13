import { Request, Response } from "express";
import "reflect-metadata";
import OrderService from "../service/order";

export const getRefundAccounts = async (req: Request, res: Response) => {
  const userId = res.locals.decoded.userId;

  const orders = await OrderService.getOrders({
    userId,
    payMethod: "bankTransfer",
  });

  try {
    return res.send(JSON.parse(orders[0].refundJson));
  } catch (e) {
    return res.send(false);
  }
};
