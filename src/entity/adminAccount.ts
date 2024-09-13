import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class AdminAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
