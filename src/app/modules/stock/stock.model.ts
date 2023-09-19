import { Schema, model } from "mongoose";
import { IStock, StockModel } from "./stock.interface";

const StockSchema = new Schema<IStock, StockModel>(
  {
    productId: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    suppliedBy: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    category: String,
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    sellCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Stock = model<IStock, StockModel>("Stock", StockSchema);
