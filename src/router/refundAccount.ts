import express from "express";
import { getRefundAccounts } from "../controller/refundAccount";
import { checkToken } from "../helper/auth";

const router = express.Router();

router.get("/", checkToken, getRefundAccounts);

export const refundAccountRouter = router;
