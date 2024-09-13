import express from "express";
import { getShippingAddressList } from "../controller/shippingAddress";
import { checkToken } from "../helper/auth";

const router = express.Router();

router.get("/", checkToken, getShippingAddressList);

export const shippingAddressRouter = router;
