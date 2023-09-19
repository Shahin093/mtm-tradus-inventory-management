import { Model, Types } from "mongoose";
import { IBrand } from "../brand/brand.interface";
import { IStore } from "../store/store.interface";
import { ISupplier } from "../supplier/supplier.interface";
import { IProduct } from "../product/product.interface";

export type IStock = {
  productId: Types.ObjectId | IProduct;
  name: string;
  description: string;
  unit: string;
  imageURL: string;
  price: number;
  quantity: number;
  status: string;
  store: Types.ObjectId | IStore;
  suppliedBy: Types.ObjectId | ISupplier;
  category: string;
  brand: Types.ObjectId | IBrand;
  sellCount: number;
};

export type IStockFilters = {
  searchTerm?: string;
  name?: string;
  unit?: string;
  brand?: string;
  status?: string;
  store?: string;
  suppliedBy?: string;
};

export type StockModel = Model<IStock, Record<string, unknown>>;
