"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    password: {
        type: String,
        // required: true,
    },
    confirmPassword: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        enum: ["admin", "super-admin", "user"],
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: false,
            },
        },
        // required: true,
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    email: {
        type: String,
        // unique: true,
        // required: true,
    },
    contactNo: {
        type: String,
        // unique: true,
        // required: true,
    },
    emergencyContactNo: {
        type: String,
    },
    presentAddress: {
        type: String,
        // required: true,
    },
    permanentAddress: {
        type: String,
        // required: true,
    },
    designation: {
        type: String,
        // required: true,
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
});
UserSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Users.findOne({ email: email }, { password: 1, email: 1, role: 1 });
    });
};
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// hashing password
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, 12);
        next();
    });
});
exports.Users = (0, mongoose_1.model)("Users", UserSchema);
