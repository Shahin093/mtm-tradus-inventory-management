import express from "express";
import { AuthController } from "./auth.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { AuthZodValidation } from "./auth.validation";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();
router.post(
  "/login",
  zodValidateRequest(AuthZodValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  "/refresh-token",
  zodValidateRequest(AuthZodValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  "/change-password",
  zodValidateRequest(AuthZodValidation.changePasswordZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AuthController.changePassword
);

export const AuthRoutes = router;
