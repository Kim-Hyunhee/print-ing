import { Request, Response } from "express";
import "reflect-metadata";

export const postProductImageUpload = async (req: any, res: Response) => {
  const file = req.file;

  return res.send(file.location);
};

export const postBannerUpload = async (req: Request, res: Response) => {
  const file = req.file as Express.MulterS3.File;
  if (!file) {
    return res.status(400).send({ message: "파일을 넣어주세요." });
  }

  return res.send(file.location);
};
