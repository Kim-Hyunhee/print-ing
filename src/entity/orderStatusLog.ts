import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Order } from ".";

export enum status {
  completion = "주문완료",
  purchase = "결제완료",
  making = "제작중",
  cancel = "취소완료",
  refund = "환불완료",
  shipping = "배송중",
  complete = "배송완료",
  standBy = "결제대기",
}

@Entity()
export class OrderStatusLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: status })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => Order, (order) => order.orderStatusLog)
  order!: Order;
}
