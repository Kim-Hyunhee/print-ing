import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User, Order } from ".";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @Column()
  image: string;

  @Column()
  star: number;

  @Column({ default: 1 })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.reviews)
  user!: User;

  @ManyToOne((type) => Order, (order) => order.reviews)
  order!: Order;
}
