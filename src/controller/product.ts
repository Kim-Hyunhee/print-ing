import { Response } from "express";
import "reflect-metadata";
import OrderProductService from "../service/orderProduct";
import ProductService from "../service/product";

export const getProducts = async (req: any, res: Response) => {
  const { status } = req.query;
  const orderAmounts = await OrderProductService.getOrderAmounts({});
  const products = await ProductService.getProducts({
    status,
    isShow: 1,
  });

  const result = products.map((product) => {
    const orderAmount =
      +orderAmounts.find((order) => {
        return product.id === order.productId;
      })?.orderAmount || 0;
    return {
      ...product,
      orderAmount,
    };
  });

  return res.send(result);
};

export const getProduct = async (req: any, res: Response) => {
  const { id } = req.params;
  const orderAmounts = await OrderProductService.getOrderAmounts({
    productId: id,
  });
  const orderAmount = +orderAmounts[0]?.orderAmount || 0;
  const product = await ProductService.getProduct({ id, isShow: 1 });

  return res.send({ ...product, orderAmount });
};
