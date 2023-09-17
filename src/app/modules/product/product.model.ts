import { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

const ProductSchema = new Schema<IProduct, ProductModel>(
  {
    name: String,
    description: String,
    imageURL: String,
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    unit: {
      type: String,
      default: "active",
      enum: ["KG", "Litre", "PCS", "bag"],
    },
    category: String,
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct, ProductModel>("Product", ProductSchema);
