import { Response } from "express";
import "reflect-metadata";
import ProductOptionValueService from "../service/productOptionValue";

export const postProductOptionValue = async () => {
  ProductOptionValueService.createProductOptionValue;
};

export const putProductOptionValue = async () => {
  ProductOptionValueService.putProductOptionValue;
};

export const deleteProductOptionValue = async () => {
  ProductOptionValueService.deleteProductOptionValue;
};

export const getProductOptionValues = async () => {
  ProductOptionValueService.getProductOptionValues;
};
