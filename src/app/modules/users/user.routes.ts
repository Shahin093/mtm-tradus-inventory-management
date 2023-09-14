import express from "express";
import { UserController } from "./user.controllers";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.post("/create-user", UserController.insertIntoDB);

router.patch("/:id", UserController.updateUser);

export const UserRoutes = router;
