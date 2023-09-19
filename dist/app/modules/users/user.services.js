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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const PaginationHelper_1 = require("../../../helpers/PaginationHelper");
const user_constants_1 = require("./user.constants");
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password: userPassword, confirmPassword } = payload;
    if (userPassword != confirmPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Password does not matched!");
    }
    const result = yield user_model_1.Users.create(payload);
    return result;
});
// {
//   "password":"103511",
//   "confirmPassword":"103511",
//   "role":"admin",
//   "name": {
//     "firstName":"Shidul",
//     "middleName":"Islam",
//     "lastName":"Shahin"
//   },
//   "dateOfBirth":"07-11-2000",
//   "gender":"male",
//   "bloodGroup":"A+",
//   "email":"sishahin0931@gamil.com",
//   "contactNo":"017746213000",
//   "emergencyContactNo":"018216664116",
//   "presentAddress": "JhulonPol, Madbarhat, Mirsarai, Chittagong",
//   "permanentAddress": "JhulonPol, Madbarhat, Mirsarai, Chittagong & Bangladesh",
//   "designation":"developer",
//   "profileImage":"https://shahin.png"
// }
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = PaginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: user_constants_1.userSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    // Filters needs $and to fullfil all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.Users.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select("-password")
        .select("-confirmPassword");
    const total = yield user_model_1.Users.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.Users.findOne({
        _id: id,
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.Users.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    })
        .select("-password")
        .select("-confirmPassword");
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.Users.findOne({
        _id: id,
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const result = yield user_model_1.Users.deleteOne({ _id: id }, {
        new: true,
    });
    if (result.deletedCount === 1) {
        // Return the deleted user object
        return isExist;
    }
    else {
        throw new Error("Failed to delete user");
    }
    // return result;
});
exports.UserService = {
    insertIntoDB,
    getAllUsers,
    updateUser,
    deleteUser,
};
