import express from "express";
import { UserController } from "./user.controllers";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { UserZodValidation } from "./user.validations";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.post(
  "/create-user",
  zodValidateRequest(UserZodValidation.createUser),
  UserController.insertIntoDB
);

router.patch(
  "/:id",
  zodValidateRequest(UserZodValidation.updateUser),
  UserController.updateUser
);

router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
