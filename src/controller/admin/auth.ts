import { Response, Request } from "express";
import "reflect-metadata";
import UserService from "../../service/user";

export const loginAdmin = async (req: any, res: Response) => {
  const { email, password } = req.body;
  const admin = await UserService.login({ email, password });
  if (!admin) {
    return res
      .status(400)
      .send({ message: "이메일과 비밀번호를 확인해주세요." });
  }
  if (!admin.user.isAdmin) {
    return res.status(403).send({ message: "권한이 없습니다." });
  }

  const token = admin.token;

  return res.send({ token });
};

export const getUsers = async (req: Request, res: Response) => {
  const { page } = req.query;

  const users = await UserService.getUsers({ page: +page });
  const orderUsers = await UserService.getOrderAmounts();

  const result = users.map((user) => {
    const orderAmount = orderUsers.find((order) => user.id === order.userId);

    return {
      ...user,
      orderAmount: orderAmount ? +orderAmount.orderAmount : 0,
    };
  });

  return res.send(result);
};
