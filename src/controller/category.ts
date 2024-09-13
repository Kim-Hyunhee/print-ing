import { Response } from "express";
import "reflect-metadata";
import CategoryService from "../service/category";
import OrderProductService from "../service/orderProduct";
import OrderStatusLogService from "../service/orderStatusLog";

export const getCategories = async (req: any, res: Response) => {
  const categories = await CategoryService.getCategories({ isShow: 1 });

  const orderAmounts = await OrderProductService.getOrderAmounts({});

  const result = categories.map((category) => {
    const products = category.products.map((product) => {
      const orderAmount =
        +orderAmounts.find((order) => {
          return product.id === order.productId;
        })?.orderAmount || 0;
      return {
        ...product,
        orderAmount,
      };
    });
    return { ...category, products };
  });

  return res.send(result);
};

export const getCategory = async (req: any, res: Response) => {
  const { id } = req.params;

  const category = await CategoryService.getCategory({ id, isShow: 1 });
  const orderAmounts = await OrderProductService.getOrderAmounts({});

  const result = category.products.map((product) => {
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
