import { Schema, model } from "mongoose";
import { IStore, StoreModel } from "./store.interface";

const BrandSchema = new Schema<IStore, StoreModel>(
  {
    name: String,
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Users",
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

export const Store = model<IStore, StoreModel>("Store", BrandSchema);
