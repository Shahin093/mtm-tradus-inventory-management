import express from "express";
import { BrandController } from "./brand.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { BrandValidation } from "./brand.validation";

const router = express.Router();

router.get("/", BrandController.getAllFromDB);

router.get("/:id", BrandController.getByIdFromDB);

router.patch("/:id", BrandController.updateFromDB);

router.post(
  "/create-brand",
  zodValidateRequest(BrandValidation.create),
  BrandController.insertIntoDB
);

export const BrandRoutes = router;
