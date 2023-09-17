import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { storeSearchableFields } from "./store.constants";
import { IStore, IStoreFilters } from "./store.interface";
import { Store } from "./store.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

// {
//   "name":"chattogram",
// "status":"active",
// "manager":"64ff5d72f2abea436b0ecb68"
// }
const insertInToDB = async (payload: IStore): Promise<IStore> => {
  const result = await Store.create(payload);
  return result;
};

const getAllFromDB = async (
  filters: IStoreFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IStore[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: storeSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Filters needs $and to fullfil all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Store.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("manager");
  const total = await Store.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<IStore | null> => {
  const result = await Store.findById(id).populate("manager");
  return result;
};

const updateFromDB = async (
  id: string,
  payload: Partial<IStore>
): Promise<IStore | null> => {
  const isExist = await Store.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Brand does not exist!");
  }

  const result = await Store.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("manager");
  return result;
};

export const StoreService = {
  insertInToDB,
  getAllFromDB,
  getByIdFromDB,
  updateFromDB,
};
