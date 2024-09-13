import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User, Coupon } from ".";

@Entity()
export class UserCoupon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.userCoupons)
  user!: User;

  @ManyToOne((type) => Coupon, (coupon) => coupon.userCoupons)
  coupon!: Coupon;
}
