import express from "express";
import { getBanners } from "../controller/banners";
import { checkToken } from "../helper/auth";

const router = express.Router();

router.get("/", getBanners);

export const bannerRouter = router;
