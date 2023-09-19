"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const mongoose_1 = require("mongoose");
const SupplierSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    // brand: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Brand",
    // },
    // brand: String,
    contactNumber: String,
    emergencyContactNumber: String,
    tradeLicenseNumber: Number,
    permanentAddress: String,
    presentAddress: String,
    location: {
        type: String,
        enum: ["Dhaka", "Chittagong", "Rajshahi"],
    },
    imageURL: String,
    nationalIdImageURL: String,
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"],
    },
}, {
    timestamps: true,
});
exports.Supplier = (0, mongoose_1.model)("Supplier", SupplierSchema);
