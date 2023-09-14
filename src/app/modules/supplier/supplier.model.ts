import { Schema, model } from "mongoose";
import { ISupplier, SupplierModel } from "./supplier.interface";

const SupplierSchema = new Schema<ISupplier, SupplierModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

export const Supplier = model<ISupplier, SupplierModel>(
  "Supplier",
  SupplierSchema
);
