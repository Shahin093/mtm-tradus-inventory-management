import { BrandModel, IBrand } from "./brand.interface";
import { Schema, model } from "mongoose";

const BrandSchema = new Schema<IBrand, BrandModel>(
  {
    name: String,
    email: String,
    products: String,
    suppliers: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
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

export const Brand = model<IBrand, BrandModel>("Brand", BrandSchema);
