import express from "express";
import { StoreController } from "./store.controller";

const router = express.Router();

router.post("/create-store", StoreController.insertIntoDB);

export const StoreRoutes = router;
