import express from "express";
import { getUsers } from "../../controller/admin/auth";
import { checkAdminToken } from "../../helper/auth";

const router = express.Router();

router.get("/", checkAdminToken, getUsers);

export const userRouter = router;
