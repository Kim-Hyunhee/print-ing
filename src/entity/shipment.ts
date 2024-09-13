import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./";

@Entity()
export class Shipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courierName: string;

  @Column()
  invoiceNumber: string;

  @Column()
  deliveryStartDate: Date;

  @Column()
  deliveryCompleteDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}
