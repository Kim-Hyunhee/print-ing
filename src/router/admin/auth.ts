import express from "express";
import { loginAdmin } from "../../controller/admin/auth";

const router = express.Router();

router.post("/logIn", loginAdmin);

export const authRouter = router;
