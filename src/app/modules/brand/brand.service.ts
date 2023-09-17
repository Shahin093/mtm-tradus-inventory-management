import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { brandSearchableFields } from "./brand.constants";
import { IBrand, IBrandFilters } from "./brand.interface";
import { Brand } from "./brand.model";

const insertIntoDB = async (payload: IBrand): Promise<IBrand> => {
  const result = await Brand.create(payload);

  return result;
};

const getAllFromDB = async (
  filters: IBrandFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IBrand[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: brandSearchableFields.map((field) => ({
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

  const result = await Brand.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("suppliers");
  const total = await Brand.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BrandService = {
  getAllFromDB,
  insertIntoDB,
};
