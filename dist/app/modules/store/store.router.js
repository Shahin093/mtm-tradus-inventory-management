"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRoutes = void 0;
const express_1 = __importDefault(require("express"));
const store_controller_1 = require("./store.controller");
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const store_validation_1 = require("./store.validation");
const router = express_1.default.Router();
router.get("/", store_controller_1.StoreController.getAllFromDB);
router.get("/:id", store_controller_1.StoreController.getByIdFromDB);
router.patch("/:id", (0, zodValidateRequest_1.default)(store_validation_1.StoreValidation.update), 
//   auth(ENUM_USER_ROLE.ADMIN),
store_controller_1.StoreController.updateFromDB);
router.delete("/:id", 
//   auth(ENUM_USER_ROLE.ADMIN),
store_controller_1.StoreController.deleteFromDB);
router.post("/create-store", (0, zodValidateRequest_1.default)(store_validation_1.StoreValidation.create), 
//   auth(ENUM_USER_ROLE.ADMIN),
store_controller_1.StoreController.insertIntoDB);
exports.StoreRoutes = router;
