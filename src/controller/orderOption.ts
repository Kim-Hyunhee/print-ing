import { Response } from "express";
import "reflect-metadata";
import OrderOptionService from "../service/orderOption";

export const postOpderOption = async () => {
  OrderOptionService.createOrderOption;
};

export const putOrderOption = async () => {
  OrderOptionService.putOrderOption;
};

export const deleteOrderOption = async () => {
  OrderOptionService.deleteOrderOption;
};

export const patchOrderOption = async () => {
  OrderOptionService.patchOrderOption;
};
