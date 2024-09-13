import { Response, Request } from "express";
import "reflect-metadata";

export const postProductImageUpload = async (req: Request, res: Response) => {
  const file = req.file as Express.MulterS3.File;

  return res.send(file.location);
};
