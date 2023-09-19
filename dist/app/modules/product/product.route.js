"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
router.get("/", product_controller_1.ProductController.getAllFromDB);
router.get("/:id", product_controller_1.ProductController.getByIdFromDB);
router.patch("/:id", (0, zodValidateRequest_1.default)(product_validation_1.ProductValidation.update), 
// auth(ENUM_USER_ROLE.ADMIN),
product_controller_1.ProductController.updateFromDB);
router.delete("/:id", 
// auth(ENUM_USER_ROLE.ADMIN),
product_controller_1.ProductController.deleteFromDB);
router.post("/create-product", (0, zodValidateRequest_1.default)(product_validation_1.ProductValidation.create), 
// auth(ENUM_USER_ROLE.ADMIN),
product_controller_1.ProductController.insertIntoDB);
exports.ProductRoutes = router;
