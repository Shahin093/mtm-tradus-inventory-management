import express from "express";
import { StoreController } from "./store.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { StoreValidation } from "./store.validation";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/", StoreController.getAllFromDB);

router.get("/:id", StoreController.getByIdFromDB);

router.patch(
  "/:id",
  zodValidateRequest(StoreValidation.update),
  //   auth(ENUM_USER_ROLE.ADMIN),
  StoreController.updateFromDB
);

router.post(
  "/create-store",
  zodValidateRequest(StoreValidation.create),
  //   auth(ENUM_USER_ROLE.ADMIN),
  StoreController.insertIntoDB
);

export const StoreRoutes = router;
