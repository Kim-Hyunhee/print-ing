import BannerService from "../../service/banner";
import { Request, Response } from "express";

export const postBanner = async (req: Request, res: Response) => {
  const { position, image, link } = req.body;

  if (isNaN(position)) {
    return res.status(400).send({ message: "숫자로 입력해주세요." });
  }

  await BannerService.createBanner({ position, image, link });

  return res.send(true);
};

export const putBanner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { position, image, link } = req.body;

  if (isNaN(+id) || isNaN(+position)) {
    return res.status(400).send({ message: "숫자로 입력해주세요." });
  }

  await BannerService.putBanner({ position, image, link, id: +id });

  return res.send(true);
};

export const getBanners = async (req: Request, res: Response) => {
  const banners = await BannerService.getBanners();

  return res.send(banners);
};

export const deleteBanner = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(+id)) {
    return res.status(400).send({ message: "숫자로 입력해주세요." });
  }

  await BannerService.deleteBanner({ bannerId: +id });

  return res.send(true);
};
