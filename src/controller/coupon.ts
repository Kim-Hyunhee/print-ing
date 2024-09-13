import { Response } from "express";
import "reflect-metadata";
import CouponService from "../service/coupon";

export const postCoupon = async () => {
  CouponService.createCoupon;
};

export const putCoupon = async () => {
  CouponService.putCoupon;
};

export const deleteCoupon = async () => {
  CouponService.deleteCoupon;
};

export const getCoupons = async () => {
  CouponService.getCoupons;
};

export const getCoupon = async () => {
  CouponService.getCoupon;
};
