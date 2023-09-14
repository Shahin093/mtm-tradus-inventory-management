import express from "express";
import { SupplierController } from "./suppliler.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { SupplierValidation } from "./supplier.validation";

const router = express.Router();

router.get("/", SupplierController.getAllSupplier);
router.get("/:id", SupplierController.getSingleSupplier);

router.post(
  "/",
  zodValidateRequest(SupplierValidation.create),
  SupplierController.insertIntoDB
);

export const SupplierRoutes = router;
