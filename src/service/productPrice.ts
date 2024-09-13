import "reflect-metadata";
import { getRepository } from "typeorm";
import { ProductPrice } from "../entity";
import ProductService from "./product";

const ProductPriceService = {
  createProductPrice: async ({
    amount,
    price,
    discountRate,
    productId,
  }: {
    amount: number;
    price: number;
    discountRate: number;
    productId: number;
  }) => {
    const product = await ProductService.getProduct({ id: productId });

    if (!product) {
      return false;
    }

    const productPrice = new ProductPrice();
    productPrice.product = product;
    productPrice.amount = amount;
    productPrice.price = price;
    productPrice.discountRate = discountRate;

    await ProductPrice.save(productPrice);
  },

  putProductPrice: async ({
    amount,
    price,
    discountRate,
    productPriceId,
  }: {
    amount: number;
    price: number;
    discountRate: number;
    productPriceId: number;
  }) => {
    await getRepository(ProductPrice)
      .createQueryBuilder("productPrice")
      .update(ProductPrice)
      .set({
        amount,
        price,
        discountRate,
      })
      .where("id = :productPriceId", { productPriceId })
      .execute();

    return true;
  },

  deleteProductPrice: async ({
    productPriceId,
  }: {
    productPriceId: number;
  }) => {
    await getRepository(ProductPrice)
      .createQueryBuilder("productPrice")
      .delete()
      .from(ProductPrice)
      .where("id = :productPriceId", { productPriceId })
      .execute();

    return true;
  },
};
export default ProductPriceService;
