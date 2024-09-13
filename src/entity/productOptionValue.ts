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
import { ProductOption, OrderOption } from ".";

@Entity()
export class ProductOptionValue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    (type) => ProductOption,
    (productOption) => productOption.productOptionValues
  )
  productOption!: ProductOption;

  @OneToMany(
    (type) => OrderOption,
    (orderOption) => orderOption.productOptionValue
  )
  orderOptions: OrderOption[];
}
