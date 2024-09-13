import express from "express";
import {
  postOrder,
  getOrders,
  getOrder,
  getOrderStandBy,
  putOrder,
} from "../controller/order";
import { checkToken } from "../helper/auth";

const router = express.Router();

router.get("/stand-by", checkToken, getOrderStandBy);
router.post("/", checkToken, postOrder);
router.get("/", checkToken, getOrders);
router.get("/:orderNumber", checkToken, getOrder);
router.put("/:orderNumber", checkToken, putOrder);

export const orderRouter = router;
