export const jwtSecretKey = "areogiyuWOIEFHDNCUSDKGPKAASCASkiogjlksd";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, jwtSecretKey);
    res.locals.decoded = decoded;
    if (res.locals.decoded.isAdmin === false) {
      return res.status(403).send({ message: "권한이 없습니다." });
    }
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(419).send({ message: "토큰 만료" });
    } else {
      console.log(err);
      return res.status(401).send({ message: "토큰이 유효하지 않습니다." });
    }
  }
};

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, jwtSecretKey);
    res.locals.decoded = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(419).send({ message: "토큰 만료" });
    } else {
      return res.status(401).send({ message: "토큰이 유효하지 않습니다." });
    }
  }
};
