import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import {
  Category,
  ProductOption,
  OrderOption,
  ProductPrice,
  OrderProduct,
} from ".";

export enum status {
  plan = "예정",
  ing = "진행중",
  stop = "마감",
}

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column()
  productionPeriod: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: "enum", enum: status })
  status: string;

  @Column()
  isShow: number;

  @Column()
  guideLine: string;

  @Column()
  guideLineFile: string;

  @Column()
  thumbnail: string;

  @Column()
  metaTitle: string;

  @Column("text")
  metaThumbnail: string;

  @Column("text")
  metaDescription: string;

  @Column({ type: "json" })
  bannerImages: string[];

  @Column({ type: "json" })
  detailImages: string[];

  @Column()
  allAmount: number;

  @Column()
  minAmount: number;

  @Column()
  limitAmount: number;

  @Column()
  isNoLimit: boolean;

  @Column()
  isImage: boolean;

  @Column({ nullable: true })
  multiple: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Category, (category) => category.products)
  category!: Category;

  @OneToMany((type) => ProductOption, (productOption) => productOption.product)
  productOptions: ProductOption[];

  @OneToMany((type) => OrderOption, (orderOption) => orderOption.product)
  orderOptions: OrderOption[];

  @OneToMany((type) => ProductPrice, (productPrices) => productPrices.product)
  productPrices: ProductPrice[];

  @OneToMany((type) => OrderProduct, (orderProducts) => orderProducts.product)
  orderProducts: OrderProduct[];
}
