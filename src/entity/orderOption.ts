import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Order, ProductOption, ProductOptionValue, Product } from ".";

@Entity()
export class OrderOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Order, (order) => order.orderOptions)
  order!: Order;

  @ManyToOne(
    (type) => ProductOption,
    (productOption) => productOption.orderOptions
  )
  productOption!: ProductOption;

  @ManyToOne(
    (type) => ProductOptionValue,
    (productOptionValue) => productOptionValue.orderOptions
  )
  productOptionValue!: ProductOptionValue;

  @ManyToOne((type) => Product, (product) => product.orderOptions)
  product!: Product;
}
