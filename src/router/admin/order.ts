import express from "express";
import {
  getOrders,
  getOrder,
  patchOrderIsRefund,
} from "../../controller/admin/order";
import { checkAdminToken } from "../../helper/auth";

const router = express.Router();

router.get("/", checkAdminToken, getOrders);
router.get("/:id", checkAdminToken, getOrder);
router.patch("/:id/isRefund", checkAdminToken, patchOrderIsRefund);

export const orderRouter = router;
