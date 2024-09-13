import express from "express";
import { getCouriers } from "../../controller/admin/courier";
import { checkAdminToken } from "../../helper/auth";

const router = express.Router();

router.get("/", checkAdminToken, getCouriers);

export const courierRouter = router;
