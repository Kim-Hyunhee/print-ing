import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Banner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: number;

  @Column()
  link: string;

  @Column({ length: 500 })
  image: string;

  @Column({ length: 500 })
  phoneImage: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
