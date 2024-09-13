import express from "express";
import { categoryRouter } from "./category";
import { productRouter } from "./product";
import { uploadRouter } from "./upload";
import { authRouter } from "./auth";
import { orderRouter } from "./order";
import { shipmentRouter } from "./shipment";
import { productPriceRouter } from "./productPrice";
import { courierRouter } from "./courier";
import { userRouter } from "./user";
import { bannerRouter } from "./banner";

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/upload", uploadRouter);
router.use("/auth", authRouter);
router.use("/orders", orderRouter);
router.use("/shipment", shipmentRouter);
router.use("/productPrice", productPriceRouter);
router.use("/couriers", courierRouter);
router.use("/users", userRouter);
router.use("/banners", bannerRouter);

export const adminRouter = router;
