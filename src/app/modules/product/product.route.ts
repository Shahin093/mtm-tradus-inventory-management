import express from "express";
import { ProductController } from "./product.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { ProductValidation } from "./product.validation";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/", ProductController.getAllFromDB);

router.get("/:id", ProductController.getByIdFromDB);

router.patch(
  "/:id",
  zodValidateRequest(ProductValidation.update),
  // auth(ENUM_USER_ROLE.ADMIN),
  ProductController.updateFromDB
);

router.post(
  "/create-product",
  zodValidateRequest(ProductValidation.create),
  // auth(ENUM_USER_ROLE.ADMIN),
  ProductController.insertIntoDB
);

export const ProductRoutes = router;
