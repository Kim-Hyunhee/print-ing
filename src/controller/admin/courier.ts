import { Response, Request } from "express";
import "reflect-metadata";
import CourierService from "../../service/courier";

export const getCouriers = async (req: any, res: Response) => {
  const couriers = await CourierService.getCouriers();

  return res.send(couriers);
};
