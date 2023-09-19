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
exports.BrandService = void 0;
const PaginationHelper_1 = require("../../../helpers/PaginationHelper");
const brand_constants_1 = require("./brand.constants");
const brand_model_1 = require("./brand.model");
const supplier_model_1 = require("../supplier/supplier.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
// {
//     "name":"CMP",
//     "email":"si@gamil.com",
//     "website":"shahin.com",
//     "products":"ami achi tmr jonno ",
//     "suppliers":"650299d5b8211a408dbdd56d"
//   }
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield supplier_model_1.Supplier.findById({ _id: payload.suppliers });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Supplier does not exist.");
    }
    const result = (yield brand_model_1.Brand.create(payload)).populate("suppliers");
    return result;
});
const getAllFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = PaginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: brand_constants_1.brandSearchableFields.map((field) => ({
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
    const result = yield brand_model_1.Brand.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("suppliers");
    const total = yield brand_model_1.Brand.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_model_1.Brand.findById(id).populate("suppliers");
    return result;
});
const updateFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield brand_model_1.Brand.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Brand does not exist!");
    }
    const result = yield brand_model_1.Brand.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate("suppliers");
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield brand_model_1.Brand.findOne({
        _id: id,
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Brand does not found !");
    }
    const result = yield brand_model_1.Brand.deleteOne({ _id: id }, {
        new: true,
    });
    if (result.deletedCount === 1) {
        // Return the deleted user object
        return isExist;
    }
    else {
        throw new Error("Failed to delete Brand");
    }
});
exports.BrandService = {
    getAllFromDB,
    insertIntoDB,
    getByIdFromDB,
    updateFromDB,
    deleteFromDB,
};
