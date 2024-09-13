import "reflect-metadata";
import { Courier } from "../entity";
import { getRepository } from "typeorm";

const CourierService = {
  createCourier: async () => {},
  putCourier: async () => {},
  deleteCourier: async () => {},

  getCourier: async ({ id, name }: { id?: number; name?: string }) => {
    const oneCourier = getRepository(Courier).createQueryBuilder();

    if (id) {
      oneCourier.where("id = :id", { id });
    }
    if (name) {
      oneCourier.where("name = :name", { name });
    }
    const courier = await oneCourier.getOne();

    return courier;
  },

  getCouriers: async () => {
    const couriers = await getRepository(Courier)
      .createQueryBuilder("courier")
      .getMany();

    return couriers;
  },
};
export default CourierService;
