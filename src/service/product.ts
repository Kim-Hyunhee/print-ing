import "reflect-metadata";
import { Product } from "../entity";
import { getRepository } from "typeorm";
import CategoryService from "./category";

const ProductService = {
  createProduct: async ({
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
  }: {
    categoryId: number;
    name: string;
    price: number;
    startDate: Date;
    endDate: Date;
    status: string;
    productionPeriod: number;
    guideLine: string;
    guideLineFile: string;
    detailImages: string[];
    bannerImages: string[];
    thumbnail: string;
    allAmount: number;
    minAmount: number;
    limitAmount: number;
    isNoLimit: boolean;
    isShow: number;
    type: string;
    metaTitle: string;
    metaThumbnail: string;
    metaDescription: string;
    isImage: boolean;
    multiple?: number;
  }) => {
    const category = await CategoryService.getCategory({ id: categoryId });
    if (!category) {
      return {
        success: false,
        message: "카테고리가 존재하지 않습니다.",
      };
    }

    if (!guideLineFile) {
      return {
        success: false,
        message: "가이드라인 파일이 등록되지 않았습니다.",
      };
    }

    const product = new Product();
    product.category = category;
    product.name = name;
    product.price = price;
    product.startDate = startDate;
    product.endDate = endDate;
    product.status = status;
    product.productionPeriod = productionPeriod;
    product.guideLine = guideLine;
    product.guideLineFile = guideLineFile;
    product.bannerImages = bannerImages;
    product.thumbnail = thumbnail;
    product.detailImages = detailImages;
    product.allAmount = allAmount;
    product.limitAmount = limitAmount;
    product.minAmount = minAmount;
    product.isNoLimit = isNoLimit;
    product.isShow = isShow;
    product.type = type;
    product.metaTitle = metaTitle;
    product.metaThumbnail = metaThumbnail;
    product.metaDescription = metaDescription;
    product.isImage = isImage;
    product.multiple = multiple;

    const productItem = await Product.save(product);

    return { success: true, message: productItem };
  },

  putProduct: async ({
    productId,
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
  }: {
    productId: number;
    categoryId: number;
    name: string;
    price: number;
    startDate: Date;
    endDate: Date;
    status: string;
    productionPeriod: number;
    guideLine: string;
    guideLineFile: string;
    detailImages: string[];
    bannerImages: string[];
    thumbnail: string;
    allAmount: number;
    minAmount: number;
    limitAmount: number;
    isShow: number;
    type: string;
    metaTitle: string;
    metaThumbnail: string;
    metaDescription: string;
    isImage: boolean;
    multiple?: number;
  }) => {
    const category = await CategoryService.getCategory({ id: categoryId });
    if (!category) {
      return false;
    }

    await getRepository(Product)
      .createQueryBuilder("product")
      .update(Product)
      .set({
        category,
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
      })
      .where("id = :productId", { productId })
      .execute();

    return true;
  },

  deleteProduct: async () => {},

  getProducts: async ({
    status,
    isShow,
  }: {
    status?: string;
    isShow?: number;
  }) => {
    const products = getRepository(Product)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.productPrices", "productPrices");

    if (status) {
      products.where("product.status = :status", { status });
    }
    if (isShow) {
      products.andWhere("product.isShow = :isShow", { isShow });
    }

    return await products.orderBy("product.created_at", "DESC").getMany();
  },

  getProduct: async ({ id, isShow }: { id: number; isShow?: number }) => {
    const oneProduct = getRepository(Product)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.productPrices", "productPrices")
      .where("product.id = :id", { id });

    if (isShow) {
      oneProduct.andWhere("product.isShow = :isShow", { isShow });
    }
    const product = await oneProduct.getOne();

    return product;
  },

  patchProductIsShow: async ({
    productId,
    isShow,
  }: {
    productId: number;
    isShow: number;
  }) => {
    await getRepository(Product)
      .createQueryBuilder("product")
      .update(Product)
      .set({
        isShow,
      })
      .where("id = :productId", { productId })
      .execute();
  },
};
export default ProductService;
