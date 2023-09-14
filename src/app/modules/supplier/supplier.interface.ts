import { Model, Types } from "mongoose";

export type ISupplier = {
  name: string;
  email: string;
  // brand: string;
  // brand: Types.ObjectId;
  contactNumber: string;
  emergencyContactNumber: string;
  tradeLicenseNumber: number;
  presentAddress: string;
  permanentAddress: string;
  location: string;
  imageURL: string;
  nationalIdImageURL: string;
  status: string;
};

export type ISupplierFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  // _id?: string;
  location?: string;
  status?: string;
};

export type SupplierModel = Model<ISupplier, Record<string, unknown>>;
