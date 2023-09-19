"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const user_validations_1 = require("./user.validations");
const router = express_1.default.Router();
router.get("/", user_controllers_1.UserController.getAllUsers);
router.post("/create-user", (0, zodValidateRequest_1.default)(user_validations_1.UserZodValidation.createUser), user_controllers_1.UserController.insertIntoDB);
router.patch("/:id", (0, zodValidateRequest_1.default)(user_validations_1.UserZodValidation.updateUser), user_controllers_1.UserController.updateUser);
router.delete("/:id", user_controllers_1.UserController.deleteUser);
exports.UserRoutes = router;
