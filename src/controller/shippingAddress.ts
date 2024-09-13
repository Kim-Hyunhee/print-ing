import { Request, Response } from "express";
import "reflect-metadata";
import ShippingAddressService from "../service/shippingAddress";

export const getShippingAddressList = async (req: Request, res: Response) => {
  const userId = res.locals.decoded.userId;
  const shippingAddressList =
    await ShippingAddressService.getShippingAddressList({
      userId,
    });

  return res.send(shippingAddressList);
};
