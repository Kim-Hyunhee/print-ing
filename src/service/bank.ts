import "reflect-metadata";
import { Bank } from "../entity";
import { getRepository } from "typeorm";

const BankService = {
  createBank: async () => {},
  getBank: async ({ id }: { id: number }) => {
    const bank = await getRepository(Bank)
      .createQueryBuilder("bank")
      .where("bank.id = :id", { id })
      .getOne();

    return bank;
  },

  getBanks: async () => {
    const banks = await getRepository(Bank)
      .createQueryBuilder("bank")
      .orderBy({ "bank.name": "ASC" })
      .getMany();

    return banks;
  },
  putBanks: async () => {},
  deleteBanks: async () => {},
};
export default BankService;
