import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Homepage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  webImage: string;

  @Column()
  phoneImage: string;

  @Column()
  banner: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
