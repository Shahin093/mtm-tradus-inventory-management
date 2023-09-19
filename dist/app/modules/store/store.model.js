"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = require("mongoose");
const BrandSchema = new mongoose_1.Schema({
    name: String,
    manager: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"],
    },
}, {
    timestamps: true,
});
exports.Store = (0, mongoose_1.model)("Store", BrandSchema);
