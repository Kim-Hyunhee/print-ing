import "reflect-metadata";
import { User, Order } from "../entity";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecretKey as secretKey } from "../helper/auth";

const UserService = {
  createUser: async ({
    name,
    phoneNumber,
    email,
    password,
  }: {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) => {
    const findUserEmail = await UserService.getUser({ email });
    if (findUserEmail) {
      return { success: false, message: "email이 중복됩니다." };
    }

    const findUserPhoneNum = await UserService.getUser({ phoneNumber });
    if (findUserPhoneNum) {
      return { success: false, message: "휴대폰 번호가 중복됩니다." };
    }

    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);

    let user = new User();
    user.passwordHashed = hashedPW;
    user.salt = salt;
    user.name = name;
    user.phoneNumber = phoneNumber;
    user.email = email;
    await User.save(user);

    return { success: true };
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    const user = await getRepository(User).findOne({ email });
    if (!user) {
      return false;
    }

    const hashedPW = await bcrypt.hash(password, user.salt);
    if (user.passwordHashed !== hashedPW) {
      return false;
    }
    const payload = {
      userId: user.id,
      isAdmin: user.isAdmin,
    };
    const option = { expiresIn: "1d" };
    const token = jwt.sign(payload, secretKey, option);

    return { token, user };
  },

  getUsers: async ({ page }: { page: number }) => {
    const count = 15;

    const users = getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.orders", "order")
      .leftJoinAndSelect("order.shipment", "shipment")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("order.currentStatus", "currentStatus")
      .select([
        "user.id",
        "user.name",
        "user.phoneNumber",
        "user.email",
        "user.status",
        "user.isAdmin",
        "user.created_at",
        "order",
        "shipment",
        "orderProducts",
      ])
      .where(
        `(currentStatus.orderId, currentStatus.createdAt) IN
    (
      SELECT
       currentStatus.orderId,
        max(currentStatus.createdAt) AS createdAt
      FROM order_status_log AS currentStatus
      GROUP BY currentStatus.orderId
      )`
      )
      .andWhere("currentStatus.status != '결제대기'");

    if (page) {
      users.skip((page - 1) * count).take(count);
    }
    const userList = await users.getMany();

    return userList;
  },

  getUser: async ({
    id,
    email,
    phoneNumber,
  }: {
    id?: number;
    email?: string;
    phoneNumber?: string;
  }) => {
    const user = getRepository(User)
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.phoneNumber",
        "user.email",
        "user.status",
        "user.isAdmin",
        "user.created_at",
      ]);
    if (id) {
      user.where("user.id = :id", { id });
    } else if (email) {
      user.where("user.email = :email", { email });
    } else if (phoneNumber) {
      user.where("user.phoneNumber = :phoneNumber", { phoneNumber });
    }

    return user.getOne();
  },

  getMyInfo: async ({ userId }: { userId: User }) => {
    const userInfo = getRepository(User)
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.phoneNumber",
        "user.email",
        "user.isAdmin",
        "user.created_at",
      ])
      .where("user.id = :userId", { userId })
      .getOne();

    return userInfo;
  },
  patchPassword: async () => {},
  putUser: async () => {},
  patchUserStatus: async () => {},
  findPassword: async () => {},
  findEmail: async () => {},

  getOrderAmounts: async () => {
    const orderUsers = await getRepository(Order)
      .createQueryBuilder("order")
      .leftJoin("order.user", "user")
      .select(["user.id AS userId, COUNT(order.id) AS orderAmount"])
      .groupBy("user.id")
      .getRawMany();

    return orderUsers;
  },

  loginWithKakaoAndGetToken: async ({ email }: { email: string }) => {
    const user = await UserService.getUser({ email });
    if (!user) {
      return { success: false, message: "회원가입을 진행해 주세요.", email };
    }

    const payload = {
      userId: user.id,
      isAdmin: user.isAdmin,
    };
    const option = { expiresIn: "1d" };
    const token = jwt.sign(payload, secretKey, option);

    return { success: true, token, user };
  },
};
export default UserService;
