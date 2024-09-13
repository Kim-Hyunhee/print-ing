import express from "express";
import { getBanks } from "../controller/bank";
import { checkToken } from "../helper/auth";

const router = express.Router();

router.get("/", checkToken, getBanks);

export const bankRouter = router;
