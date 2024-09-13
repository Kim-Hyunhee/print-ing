import express from "express";
import { checkToken } from "../helper/auth";
import { postProductImageUpload } from "../controller/upload";
import {
  uploadCurierLogo,
  uploadHomepage,
  uploadProduct,
  uploadOrders,
} from "../helper/upload";

const router = express.Router();

router.post(
  "/orders",
  checkToken,
  uploadOrders.single("file"),
  postProductImageUpload
);

export const uploadRouter = router;
