import express from "express";
import {
  postKsnetCardCheck,
  postKsnetPayment,
  postKsnetCardCancel,
} from "../controller/kspay";
import { checkToken } from "../helper/auth";

const router = express.Router();

router.post("/payment", checkToken, postKsnetPayment);
router.post("/card/check", checkToken, postKsnetCardCheck);
router.post("/card/cancel", checkToken, postKsnetCardCancel);

export const kspayRouter = router;
