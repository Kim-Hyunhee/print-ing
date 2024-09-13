import BannerService from "../service/banner";
import { Request, Response } from "express";

export const getBanners = async (req: Request, res: Response) => {
  const banners = await BannerService.getBanners();

  return res.send(banners);
};
