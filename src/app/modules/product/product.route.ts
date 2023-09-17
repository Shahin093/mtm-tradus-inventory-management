import express from "express";
import { ProductController } from "./product.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { ProductValidation } from "./product.validation";

const router = express.Router();

router.post(
  "/create-product",
  zodValidateRequest(ProductValidation.create),
  ProductController.insertIntoDB
);

export const ProductRoutes = router;
