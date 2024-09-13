import { Request, Response } from "express";
import "reflect-metadata";
import ProductPriceService from "../../service/productPrice";

export const putProductPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(+id)) {
    return res.status(400).send({ message: "숫자만 사용 가능합니다." });
  }

  const { amount, price, discountRate } = req.body;

  await ProductPriceService.putProductPrice({
    amount,
    price,
    discountRate,
    productPriceId: +id,
  });

  return res.send(true);
};

export const postProductPrice = async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (isNaN(+productId)) {
    return res.status(400).send({ message: "숫자만 사용 가능합니다." });
  }

  const { amount, price, discountRate } = req.body;

  await ProductPriceService.createProductPrice({
    amount,
    price,
    discountRate,
    productId: +productId,
  });

  return res.send(true);
};

export const deleteProductPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(+id)) {
    return res.status(400).send({ message: "숫자만 사용 가능합니다." });
  }

  await ProductPriceService.deleteProductPrice({
    productPriceId: +id,
  });

  return res.send(true);
};
