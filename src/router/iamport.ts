import express from "express";
import { patchIamportOrderComplete } from "../controller/iamport";
import { checkToken } from "../helper/auth";

const router = express.Router();

router.patch("/complete", checkToken, patchIamportOrderComplete);

export const iamportRouter = router;
