"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const express_1 = __importDefault(require("express"));
const suppliler_controller_1 = require("./suppliler.controller");
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const supplier_validation_1 = require("./supplier.validation");
const router = express_1.default.Router();
router.get("/", suppliler_controller_1.SupplierController.getAllSupplier);
router.get("/:id", suppliler_controller_1.SupplierController.getSingleSupplier);
router.post("/", (0, zodValidateRequest_1.default)(supplier_validation_1.SupplierValidation.create), suppliler_controller_1.SupplierController.insertIntoDB);
router.patch("/:id", suppliler_controller_1.SupplierController.updateSupplier);
router.delete("/:id", suppliler_controller_1.SupplierController.deleteFromDB);
exports.SupplierRoutes = router;
