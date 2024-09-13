import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import {
  User,
  Review,
  OrderOption,
  Coupon,
  Shipment,
  OrderProduct,
  OrderStatusLog,
} from ".";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: string;
  @Column()
  userId: number;

  @Column({ nullable: true })
  payMethod: string;

  @Column({ nullable: true })
  pgUniqueId: string;
  @Column({ nullable: true })
  pgCompany: string;

  @Column()
  payAmount: number;

  @Column()
  status: string;

  @Column({ default: false })
  isRefund: boolean;

  @Column("text")
  shippingAddressJson: string;

  @Column("text")
  refundJson: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.orders)
  user!: User;

  @OneToMany((type) => Review, (review) => review.order)
  reviews: Review[];

  @OneToMany((type) => OrderOption, (orderOption) => orderOption.order)
  orderOptions: OrderOption[];

  @ManyToOne((type) => Coupon, (coupon) => coupon.orders)
  coupon!: Coupon;

  @OneToOne(() => Shipment, (shipment) => shipment.order)
  shipment: Shipment;

  @OneToMany((type) => OrderProduct, (orderProducts) => orderProducts.order)
  orderProducts: OrderProduct[];

  @OneToMany((type) => OrderStatusLog, (orderStatusLog) => orderStatusLog.order)
  orderStatusLog: OrderStatusLog[];

  @OneToOne((type) => OrderStatusLog, (orderStatusLog) => orderStatusLog.order)
  currentStatus: OrderStatusLog;
}
