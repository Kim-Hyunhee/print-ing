import express from "express";
import { getProducts, getProduct } from "../controller/product";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

export const productRouter = router;
