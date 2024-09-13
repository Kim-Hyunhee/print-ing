import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserCoupon, Order } from ".";

@Entity()
export class Coupon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  discount: number;

  @Column()
  contents: string;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => UserCoupon, (userCoupon) => userCoupon.coupon)
  userCoupons: UserCoupon[];

  @OneToMany((type) => Order, (order) => order.coupon)
  orders: Order[];
}
