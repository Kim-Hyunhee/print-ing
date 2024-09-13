import { Request, Response } from "express";
import "reflect-metadata";
import ShipmentService from "../../service/shipment";
import OrderStatusLogService from "../../service/orderStatusLog";

export const putShipment = async (req: Request, res: Response) => {
  const {
    invoiceNumber,
    courierName,
    deliveryStartDate,
    deliveryCompleteDate,
    orderId,
    status,
  } = req.body;

  const shipment = await ShipmentService.putShipment({
    invoiceNumber,
    courierName,
    deliveryStartDate,
    deliveryCompleteDate,
    orderId,
  });

  await OrderStatusLogService.postOrderStatus({
    orderId,
    status,
  });

  if (!shipment) {
    return res
      .status(400)
      .send({ message: "등록하는 정보를 다시 확인해주세요." });
  }
  return res.send(true);
};
