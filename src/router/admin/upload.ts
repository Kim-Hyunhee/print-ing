import express from "express";
import { checkAdminToken } from "../../helper/auth";
import {
  postProductImageUpload,
  postBannerUpload,
} from "../../controller/admin/upload";
import {
  uploadCurierLogo,
  uploadHomepage,
  uploadProduct,
  uploadBanner,
} from "../../helper/upload";

const router = express.Router();

router.post(
  "/products",
  checkAdminToken,
  uploadProduct.single("file"),
  postProductImageUpload
);
router.post(
  "/banners",
  checkAdminToken,
  uploadBanner.single("file"),
  postBannerUpload
);

export const uploadRouter = router;
