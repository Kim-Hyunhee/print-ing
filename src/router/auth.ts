import express from "express";
import {
  postUser,
  loginUser,
  getMyInfo,
  logOutUser,
  postKakaoLogin,
} from "../controller/auth";
import { checkToken } from "../helper/auth";

const router = express.Router();

router.post("/logIn/kakao", postKakaoLogin);
router.post("/signUp", postUser);
router.post("/logIn", loginUser);
router.get("/information", checkToken, getMyInfo);
router.delete("/logOut", checkToken, logOutUser);

export const authRouter = router;
