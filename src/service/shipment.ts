import "reflect-metadata";
import { getRepository } from "typeorm";
import { Order, Shipment } from "../entity";
import CourierService from "./courier";
import OrderService from "./order";

const ShipmentService = {
  putShipment: async ({
    courierName,
    invoiceNumber,
    deliveryStartDate,
    deliveryCompleteDate,
    orderId,
  }: {
    courierName: string;
    invoiceNumber: string;
    deliveryStartDate?: Date;
    deliveryCompleteDate?: Date;
    orderId: number;
  }) => {
    const courier = await CourierService.getCourier({ name: courierName });
    if (!courier) {
      return false;
    }
    const order = await OrderService.getOrder({ id: orderId, isAdmin: true });
    if (!order) {
      return false;
    }

    await getRepository(Shipment)
      .createQueryBuilder()
      .update(Shipment)
      .set({
        courierName,
        invoiceNumber,
        deliveryStartDate,
        deliveryCompleteDate,
      })
      .where("orderId = :orderId", { orderId })
      .execute();

    return true;
  },

  createShipment: async ({ order }: { order: Order }) => {
    const shipment = new Shipment();
    shipment.order = order;

    const createShipment = await Shipment.save(shipment);

    return createShipment.id;
  },
};
export default ShipmentService;
