import "reflect-metadata";
import { Category } from "../entity";
import { getRepository } from "typeorm";

const CategoryService = {
  createCategory: async ({ name }: { name: string }) => {
    const category = new Category();
    category.name = name;

    await Category.save(category);
    return true;
  },
  putCategory: async () => {},
  deleteCategory: async () => {},

  getCategories: async ({ isShow }: { isShow?: number }) => {
    const categories = getRepository(Category)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.products", "product")
      .leftJoinAndSelect("product.productPrices", "productPrices");

    if (isShow) {
      categories.where("product.isShow = :isShow", { isShow });
    }
    const categoryList = await categories.getMany();

    return categoryList;
  },

  getCategory: async ({ id, isShow }: { id: number; isShow?: number }) => {
    const oneCategory = getRepository(Category)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.products", "product")
      .leftJoinAndSelect("product.productPrices", "productPrices")
      .where("category.id = :id", { id });

    if (isShow) {
      oneCategory.andWhere("product.isShow = :isShow", { isShow });
    }
    const category = await oneCategory.getOne();

    return category;
  },
};
export default CategoryService;
