import express from "express";
import { StockController } from "./stock.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { StockValidation } from "./stock.validation";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/", StockController.getAllFromDB);

router.get("/:id", StockController.getByIdFromDB);

router.patch(
  "/:id",
  zodValidateRequest(StockValidation.update),
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StockController.updateFromDB
);
router.delete(
  "/:id",
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StockController.deleteFromDB
);

router.post(
  "/create-stock",
  zodValidateRequest(StockValidation.create),
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StockController.insertIntoDB
);

export const StockRoutes = router;
