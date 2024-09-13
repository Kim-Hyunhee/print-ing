import "reflect-metadata";
import { ShippingAddress, User } from "../entity";
import { getRepository } from "typeorm";

const ShippingAddressService = {
  getShippingAddress: async ({ id, userId }: { id?: number; userId: User }) => {
    const shippingAddress = await getRepository(ShippingAddress)
      .createQueryBuilder("shippingAddress")
      .where("shippingAddress.id = :id", { id })
      .andWhere("shippingAddress.userId = :userId", { userId })
      .getOne();

    return shippingAddress;
  },

  getShippingAddressList: async ({ userId }: { userId: User }) => {
    const shippingAddressList = await getRepository(ShippingAddress)
      .createQueryBuilder("shippingAddress")
      .where("shippingAddress.userId = :userId", { userId })
      .getMany();

    return shippingAddressList;
  },

  createShippingAddress: async ({
    name,
    phoneNumber,
    zipCode,
    address,
    email,
    shippingAddressName,
    message,
    userId,
  }: {
    name: string;
    phoneNumber: string;
    zipCode: string;
    address: string;
    email: string;
    shippingAddressName: string;
    message: string;
    userId: User;
  }) => {
    const shippingAddress = new ShippingAddress();
    shippingAddress.shippingAddressName = shippingAddressName;
    shippingAddress.address = address;
    shippingAddress.name = name;
    shippingAddress.email = email;
    shippingAddress.user = userId;
    shippingAddress.message = message;
    shippingAddress.phoneNumber = phoneNumber;
    shippingAddress.zipCode = zipCode;
    await ShippingAddress.save(shippingAddress);

    return true;
  },
};
export default ShippingAddressService;
