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

export const AuthRoutes = router;
