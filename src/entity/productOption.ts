import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Product, ProductOptionValue, OrderOption } from ".";

@Entity()
export class ProductOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Product, (product) => product.productOptions)
  product!: Product;

  @OneToMany(
    (type) => ProductOptionValue,
    (productOptionValue) => productOptionValue.productOption
  )
  productOptionValues: ProductOptionValue[];

  @OneToMany((type) => OrderOption, (orderOption) => orderOption.productOption)
  orderOptions: OrderOption[];
}
