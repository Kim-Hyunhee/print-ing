import express from "express";
import { getCategories, getCategory } from "../controller/category";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategory);

export const categoryRouter = router;
