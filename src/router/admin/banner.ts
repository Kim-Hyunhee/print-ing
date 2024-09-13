import express from "express";
import {
  postBanner,
  putBanner,
  getBanners,
  deleteBanner,
} from "../../controller/admin/banner";
import { checkAdminToken } from "../../helper/auth";

const router = express.Router();

router.post("/", checkAdminToken, postBanner);
router.put("/:id", checkAdminToken, putBanner);
router.get("/", checkAdminToken, getBanners);
router.delete("/:id", checkAdminToken, deleteBanner);

export const bannerRouter = router;
