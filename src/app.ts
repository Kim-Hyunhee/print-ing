import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import logger from "morgan";
import { databaseConfig } from "./database";
import "reflect-metadata";
import { swaggerUi, specs } from "./swagger";
import cookieParser from "cookie-parser";
import {
  authRouter,
  categoryRouter,
  productRouter,
  orderRouter,
  shippingAddressRouter,
  refundAccountRouter,
  uploadRouter,
  bankRouter,
  iamportRouter,
  kspayRouter,
  bannerRouter,
} from "./router";
import { adminRouter } from "./router/admin";

const app = express();
const origin = [
  "https://api.print-ing.net",
  "https://print-ing.net",
  "https://admin.print-ing.net",
  "http://localhost:3000",
];
app.use(cors({ origin, credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: any, res: any) => {
  res.send("HELLO PRINT-ING");
});

databaseConfig();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/shippingAddress", shippingAddressRouter);
app.use("/refundAccounts", refundAccountRouter);
app.use("/upload", uploadRouter);
app.use("/banks", bankRouter);
app.use("/payments", iamportRouter);
app.use("/kspay", kspayRouter);
app.use("/banners", bannerRouter);
app.use("/admin", adminRouter);

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.status(500).send("Internal Server Error");

    next(err);
  }
);

export default app;
