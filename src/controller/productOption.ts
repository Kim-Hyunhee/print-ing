import { Response } from "express";
import "reflect-metadata";
import ProductOptionService from "../service/productOption";

export const postProductOption = async () => {
  ProductOptionService.createProductOption;
};

export const putProductOption = async () => {
  ProductOptionService.putProductOption;
};

export const deleteProductOption = async () => {
  ProductOptionService.deleteProductOption;
};

export const getProductOptions = async () => {
  ProductOptionService.getProductOptions;
};
