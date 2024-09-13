import { Request, Response } from "express";
import "reflect-metadata";
import UserService from "../service/user";
import { CookieOptions } from "express-serve-static-core";
import { KakaoApi } from "../api/kakao";

export const postUser = async (req: any, res: Response) => {
  const { name, phoneNumber, email, password } = req.body;

  const result = await UserService.createUser({
    name,
    phoneNumber,
    email,
    password,
  });
  if (result.success) {
    return res.send(result);
  }

  return res.status(400).send(result);
};

export const postKakaoLogin = async (req: any, res: Response) => {
  const { code } = req.body;
  const data = await KakaoApi.getToken({ code });

  const userProfile = await KakaoApi.getUserProfile({
    accessToken: data.access_token,
  });

  const result = await UserService.loginWithKakaoAndGetToken({
    email: userProfile.kakao_account.email,
  });
  if (!result.success) {
    return res.status(400).send(result);
  }

  const token = result.token;
  // maxAge, expires: 15일
  const maxAge = 60 * 60 * 24 * 1000 * 15;
  const date = new Date();
  const convertDate = new Date(date.setDate(date.getDate() + 15));
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge,
    expires: convertDate,
  };
  res.cookie("token", token, cookieOptions);

  return res.send({ message: "login success" });
};

export const loginUser = async (req: any, res: Response) => {
  const { email, password } = req.body;

  const user = await UserService.login({ email, password });
  if (!user) {
    return res
      .status(400)
      .send({ message: "이메일과 비밀번호를 확인해주세요." });
  }

  const token = user.token;
  // maxAge, expires: 15일
  const maxAge = 60 * 60 * 24 * 1000 * 15;
  const date = new Date();
  const convertDate = new Date(date.setDate(date.getDate() + 15));
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge,
    expires: convertDate,
  };
  res.cookie("token", token, cookieOptions);

  return res.send({ message: "login success", token: token });
};

export const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");

  return res.send({ message: "logout success" });
};

export const putUser = async () => {
  UserService.putUser;
};

export const getMyInfo = async (req: Request, res: Response) => {
  const userId = res.locals.decoded.userId;

  const myInfo = await UserService.getMyInfo({ userId });

  return res.send(myInfo);
};

export const patchPassword = async () => {
  UserService.patchPassword;
};

export const patchUserStatus = async () => {
  UserService.patchUserStatus;
};

export const postPassword = async () => {
  UserService.findPassword;
};

export const postEmail = async () => {
  UserService.findEmail;
};
