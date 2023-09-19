"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const mongoose_1 = require("mongoose");
const StockSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    name: String,
    description: String,
    unit: {
        type: String,
        default: "active",
        enum: ["KG", "Litre", "PCS", "bag"],
    },
    imageURL: String,
    price: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["in-stock", "out-of-stock", "discontinued"],
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
    },
    suppliedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Supplier",
    },
    category: String,
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Brand",
    },
    sellCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Stock = (0, mongoose_1.model)("Stock", StockSchema);
