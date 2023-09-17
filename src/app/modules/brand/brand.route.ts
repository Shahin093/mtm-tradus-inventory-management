import express from "express";
import { BrandController } from "./brand.controller";

const router = express.Router();

router.get("/", BrandController.getAllFromDB);

router.post("/create-brand", BrandController.insertIntoDB);

export const BrandRoutes = router;
