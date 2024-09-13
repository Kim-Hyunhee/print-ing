import { Response } from "express";
import "reflect-metadata";
import CourierService from "../service/courier";

export const postCourier = async () => {
  CourierService.createCourier;
};

export const putCourier = async () => {
  CourierService.putCourier;
};

export const deleteCourier = async () => {
  CourierService.deleteCourier;
};
