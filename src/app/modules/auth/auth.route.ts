import express from "express";
import { AuthController } from "./auth.controller";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { AuthZodValidation } from "./auth.validation";

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

export const AuthRoutes = router;
