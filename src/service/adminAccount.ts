import "reflect-metadata";
import { AdminAccount } from "../entity";
import { getRepository } from "typeorm";

const AdminAccountService = {
  createAdminAccount: async () => {},
  putAdminAccount: async () => {},
  getAdminAccount: async () => {
    const adminAccount = await getRepository(AdminAccount)
      .createQueryBuilder()
      .getMany();

    return adminAccount;
  },
  deleteAdminAccounts: async () => {},
};
export default AdminAccountService;
