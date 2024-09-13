import { Response, Request } from "express";
import "reflect-metadata";
import ProductService from "../../service/product";
import OrderProductService from "../../service/orderProduct";

export const postProduct = async (req: any, res: Response) => {
  const {
    categoryId,
    name,
    price,
    startDate,
    endDate,
    status,
    productionPeriod,
    guideLine,
    guideLineFile,
    detailImages,
    bannerImages,
    thumbnail,
    allAmount,
    minAmount,
    limitAmount,
    isNoLimit,
    isShow,
    type,
    metaTitle,
    metaThumbnail,
    metaDescription,
    isImage,
    multiple,
  } = req.body;

  const result = await ProductService.createProduct({
    categoryId,
    name,
    price,
    startDate,
    endDate,
    status,
    productionPeriod,
    guideLine,
    guideLineFile,
    detailImages,
    bannerImages,
    thumbnail,
    allAmount,
    minAmount,
    limitAmount,
    isNoLimit,
    isShow,
    type,
    metaTitle,
    metaThumbnail,
    metaDescription,
    isImage,
    multiple,
  });

  if (!result.success) {
    return res.status(400).send(result);
  }

  return res.send(result);
};

export const getProducts = async (req: any, res: Response) => {
  const { status } = req.query;
  const orderAmounts = await OrderProductService.getOrderAmounts({});
  const products = await ProductService.getProducts({
    status,
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
  if (isNaN(+id)) {
    return res.status(400).send({ message: "숫자만 사용 가능합니다." });
  }

  const orderAmounts = await OrderProductService.getOrderAmounts({
    productId: id,
  });
  const orderAmount = +orderAmounts[0]?.orderAmount || 0;
  const product = await ProductService.getProduct({ id });

  return res.send({ ...product, orderAmount });
};

export const putProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(+id)) {
    return res.status(400).send({ message: "숫자만 사용 가능합니다." });
  }

  const {
    categoryId,
    name,
    price,
    startDate,
    endDate,
    status,
    productionPeriod,
    guideLine,
    guideLineFile,
    detailImages,
    bannerImages,
    thumbnail,
    allAmount,
    minAmount,
    limitAmount,
    isShow,
    type,
    metaTitle,
    metaThumbnail,
    metaDescription,
    isImage,
    multiple,
  } = req.body;

  const product = await ProductService.putProduct({
    productId: +id,
    categoryId,
    name,
    price,
    startDate,
    endDate,
    status,
    productionPeriod,
    guideLine,
    guideLineFile,
    detailImages,
    bannerImages,
    thumbnail,
    allAmount,
    minAmount,
    limitAmount,
    isShow,
    type,
    metaTitle,
    metaThumbnail,
    metaDescription,
    isImage,
    multiple,
  });
  if (!product) {
    return res.status(400).send({ message: "잘못된 정보입니다." });
  }
  return res.send(true);
};

export const patchProductIsShow = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(+id)) {
    return res.status(400).send({ message: "숫자만 사용 가능합니다." });
  }

  const { isShow } = req.body;

  await ProductService.patchProductIsShow({ productId: +id, isShow });

  return res.send(true);
};
