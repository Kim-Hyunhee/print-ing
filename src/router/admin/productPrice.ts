import express from "express";
import {
  putProductPrice,
  postProductPrice,
  deleteProductPrice,
} from "../../controller/admin/productPrice";
import { checkAdminToken } from "../../helper/auth";

const router = express.Router();

router.put("/:id", checkAdminToken, putProductPrice);
router.post("/:productId", checkAdminToken, postProductPrice);
router.delete("/:id", checkAdminToken, deleteProductPrice);

export const productPriceRouter = router;
