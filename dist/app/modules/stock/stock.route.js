"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRoutes = void 0;
const express_1 = __importDefault(require("express"));
const stock_controller_1 = require("./stock.controller");
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const stock_validation_1 = require("./stock.validation");
const router = express_1.default.Router();
router.get("/", stock_controller_1.StockController.getAllFromDB);
router.get("/:id", stock_controller_1.StockController.getByIdFromDB);
router.patch("/:id", (0, zodValidateRequest_1.default)(stock_validation_1.StockValidation.update), 
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
stock_controller_1.StockController.updateFromDB);
router.delete("/:id", 
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
stock_controller_1.StockController.deleteFromDB);
router.post("/create-stock", (0, zodValidateRequest_1.default)(stock_validation_1.StockValidation.create), 
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
stock_controller_1.StockController.insertIntoDB);
exports.StockRoutes = router;
