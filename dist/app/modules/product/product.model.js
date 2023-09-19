"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    imageURL: String,
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Brand",
    },
    unit: {
        type: String,
        default: "active",
        enum: ["KG", "Litre", "PCS", "bag"],
    },
    category: String,
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
