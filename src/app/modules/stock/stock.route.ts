import express from "express";
import { StockController } from "./stock.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { StockValidation } from "./stock.validation";

const router = express.Router();

router.get("/", StockController.getAllFromDB);

router.post(
  "/create-stock",
  zodValidateRequest(StockValidation.create),
  StockController.insertIntoDB
);

export const StockRoutes = router;
