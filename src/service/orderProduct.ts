import "reflect-metadata";
import { OrderProduct, Order } from "../entity";
import ProductService from "./product";
import { getRepository } from "typeorm";

const OrderProductService = {
  createOrderProduct: async ({
    image,
    amount,
    productId,
    order,
  }: {
    image?: string;
    amount: number;
    productId: number;
    order: Order;
  }) => {
    const product = await ProductService.getProduct({ id: productId });

    if (product.isImage && !image) {
      return { success: false };
    }

    const orderProduct = new OrderProduct();
    orderProduct.order = order;
    orderProduct.product = product;
    orderProduct.image = image;
    orderProduct.amount = amount;

    const { id } = await OrderProduct.save(orderProduct);

    return { success: true, id };
  },

  getOrderAmounts: async ({ productId }: { productId?: number }) => {
    const statusList = ["결제완료", "제작중", "배송중", "배송완료"];

    const orderAmount = getRepository(OrderProduct)
      .createQueryBuilder("orderProduct")
      .leftJoin("orderProduct.order", "order")
      .select([
        "orderProduct.productId",
        "SUM(orderProduct.amount) AS orderAmount",
      ])
      .leftJoin("order.orderStatusLog", "orderStatusLog")
      .where("orderStatusLog.status IN (:statusList)", { statusList })
      .andWhere(
        `orderStatusLog.createdAt = (SELECT MAX(subStatusLog.createdAt) 
          FROM order_status_log subStatusLog WHERE subStatusLog.orderId = orderStatusLog.orderId)`
      );

    if (productId) {
      orderAmount.andWhere("orderProduct.productId = :productId", {
        productId,
      });
    }
    const orderAmounts = await orderAmount
      .groupBy("orderProduct.productId")
      .getRawMany();

    return orderAmounts;
  },

  putOrderProduct: async ({
    productData,
    orderId,
    productId,
  }: {
    productData: string;
    orderId: number;
    productId: number;
  }) => {
    await getRepository(OrderProduct)
      .createQueryBuilder()
      .update(OrderProduct)
      .set({ productData })
      .where("orderId = :orderId", { orderId })
      .andWhere("productId = :productId", { productId })
      .execute();
  },

  getOrderProducts: async ({
    orderId,
    userId,
  }: {
    orderId: number;
    userId: number;
  }) => {
    const orderProducts = await getRepository(OrderProduct)
      .createQueryBuilder("orderProduct")
      .leftJoinAndSelect("orderProduct.product", "product")
      .leftJoinAndSelect("product.productPrices", "productPrices")
      .leftJoin("orderProduct.order", "order")
      .where("orderProduct.orderId = :orderId", { orderId })
      .andWhere("order.userId = :userId", { userId })
      .getMany();

    return orderProducts;
  },
};
export default OrderProductService;
