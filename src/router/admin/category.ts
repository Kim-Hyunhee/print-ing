import express from "express";
import {
  postCategory,
  getCategories,
  getCategory,
} from "../../controller/admin/category";
import { checkAdminToken } from "../../helper/auth";

const router = express.Router();

router.post("/", checkAdminToken, postCategory);
router.get("/", checkAdminToken, getCategories);
router.get("/:id", checkAdminToken, getCategory);

export const categoryRouter = router;
