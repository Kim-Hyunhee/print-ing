import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Review, Order, Notification, UserCoupon, ShippingAddress } from ".";

export enum status {
  run = "활성화",
  stop = "정지",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  passwordHashed: string;

  @Column()
  salt: string;

  @Column()
  deviceToken: string;

  @Column()
  os: string;

  @Column({ default: 0 })
  isNoti: boolean;

  @Column({ type: "enum", enum: status, default: "활성화" })
  status: string;

  @Column({ default: 0 })
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];

  @OneToMany((type) => UserCoupon, (userCoupon) => userCoupon.user)
  userCoupons: UserCoupon[];

  @OneToMany((type) => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(
    (type) => ShippingAddress,
    (shippingAddress) => shippingAddress.user
  )
  shippingAddress: ShippingAddress[];
}
