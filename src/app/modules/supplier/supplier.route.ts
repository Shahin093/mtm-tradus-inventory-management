import express from "express";
import { SupplierController } from "./suppliler.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { SupplierValidation } from "./supplier.validation";

const router = express.Router();

router.post(
  "/",
  zodValidateRequest(SupplierValidation.create),
  SupplierController.insertIntoDB
);

export const SupplierRoutes = router;
