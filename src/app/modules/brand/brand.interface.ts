import { Model, Types } from "mongoose";
import { ISupplier } from "../supplier/supplier.interface";

export type IBrand = {
  name: string;
  email: string;
  website: string;
  products: string;
  suppliers: Types.ObjectId | ISupplier;
  status: string;
};

export type IBrandFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  products?: string;
  suppliers?: string;
  status?: string;
};

export type BrandModel = Model<IBrand, Record<string, unknown>>;
