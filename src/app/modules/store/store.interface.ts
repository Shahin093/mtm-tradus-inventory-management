import { Model, Types } from "mongoose";
import { IUser } from "../users/user.interfaces";

export type IStore = {
  name: string;
  status: string;
  manager: Types.ObjectId | IUser;
};

export type IStoreFilters = {
  searchTerm?: string;
  name?: string;
  manager?: string;
  status?: string;
};

export type StoreModel = Model<IStore, Record<string, unknown>>;
