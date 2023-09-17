import { Model, Types } from "mongoose";
import { IBrand } from "../brand/brand.interface";

export type IProduct = {
  name: string;
  description: string;
  unit: string;
  imageURL: string;
  category: string;
  brand: Types.ObjectId | IBrand;
};

export type IProductFilters = {
  searchTerm?: string;
  name?: string;
  unit?: string;
  brand?: string;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
