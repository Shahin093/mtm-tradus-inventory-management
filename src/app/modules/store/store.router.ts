import express from "express";
import { StoreController } from "./store.controller";

const router = express.Router();

router.get("/", StoreController.getAllFromDB);

router.post("/create-store", StoreController.insertIntoDB);

export const StoreRoutes = router;
