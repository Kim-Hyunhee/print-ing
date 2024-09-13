import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Order, Product } from ".";

@Entity()
export class OrderProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  image: string;

  @Column("text")
  productData: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Order, (order) => order.orderProducts)
  order!: Order;

  @ManyToOne((type) => Product, (product) => product.orderProducts)
  product!: Product;
}
