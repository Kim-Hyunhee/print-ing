import express from "express";
import { putShipment } from "../../controller/admin/shipment";
import { checkAdminToken } from "../../helper/auth";

const router = express.Router();

router.put("/", checkAdminToken, putShipment);

export const shipmentRouter = router;
