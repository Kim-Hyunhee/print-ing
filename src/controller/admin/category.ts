import { Response } from "express";
import "reflect-metadata";
import CategoryService from "../../service/category";

export const postCategory = async (req: any, res: Response) => {
  const { name } = req.body;
  await CategoryService.createCategory({ name });
  return res.send(true);
};

export const getCategories = async (req: any, res: Response) => {
  const categories = await CategoryService.getCategories({});
  return res.send(categories);
};

export const getCategory = async (req: any, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.getCategory({ id });
  return res.send(category);
};
