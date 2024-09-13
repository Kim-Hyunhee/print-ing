import express from "express";
import {
  postProduct,
  getProducts,
  getProduct,
  putProduct,
  patchProductIsShow,
} from "../../controller/admin/product";
import { checkAdminToken } from "../../helper/auth";

const router = express.Router();

router.post("/", checkAdminToken, postProduct);
router.get("/", checkAdminToken, getProducts);
router.get("/:id", checkAdminToken, getProduct);
router.put("/:id", checkAdminToken, putProduct);
router.patch("/:id/isShow", checkAdminToken, patchProductIsShow);

export const productRouter = router;
