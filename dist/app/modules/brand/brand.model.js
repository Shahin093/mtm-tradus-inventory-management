"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = require("mongoose");
const BrandSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    website: String,
    products: String,
    suppliers: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Supplier",
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"],
    },
}, {
    timestamps: true,
});
exports.Brand = (0, mongoose_1.model)("Brand", BrandSchema);
