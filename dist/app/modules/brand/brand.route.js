"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRoutes = void 0;
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("./brand.controller");
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const brand_validation_1 = require("./brand.validation");
const router = express_1.default.Router();
router.get("/", brand_controller_1.BrandController.getAllFromDB);
router.get("/:id", brand_controller_1.BrandController.getByIdFromDB);
router.patch("/:id", brand_controller_1.BrandController.updateFromDB);
router.delete("/:id", brand_controller_1.BrandController.deleteFromDB);
router.post("/create-brand", (0, zodValidateRequest_1.default)(brand_validation_1.BrandValidation.create), brand_controller_1.BrandController.insertIntoDB);
exports.BrandRoutes = router;
