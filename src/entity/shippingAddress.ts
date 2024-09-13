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
import { User } from ".";

@Entity()
export class ShippingAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shippingAddressName: string;

  @Column()
  name: string;

  @Column()
  zipCode: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.shippingAddress)
  user!: User;
}
