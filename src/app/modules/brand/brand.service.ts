import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { brandSearchableFields } from "./brand.constants";
import { IBrand, IBrandFilters } from "./brand.interface";
import { Brand } from "./brand.model";
import { Supplier } from "../supplier/supplier.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
// {
//     "name":"CMP",
//     "email":"si@gamil.com",
//     "website":"shahin.com",
//     "products":"ami achi tmr jonno ",
//     "suppliers":"650299d5b8211a408dbdd56d"
//   }
const insertIntoDB = async (payload: IBrand): Promise<IBrand> => {
  const isExist = await Supplier.findById({ _id: payload.suppliers });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Supplier does not exist.");
  }
  const result = (await Brand.create(payload)).populate("suppliers");

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

const getByIdFromDB = async (id: string): Promise<IBrand | null> => {
  const result = await Brand.findById(id).populate("suppliers");
  return result;
};

const updateFromDB = async (
  id: string,
  payload: Partial<IBrand>
): Promise<IBrand | null> => {
  const isExist = await Brand.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Brand does not exist!");
  }

  const result = await Brand.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("suppliers");
  return result;
};

const deleteFromDB = async (id: string): Promise<IBrand | null> => {
  const isExist = await Brand.findOne({
    _id: id,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Brand does not found !");
  }
  const result = await Brand.deleteOne(
    { _id: id },
    {
      new: true,
    }
  );

  if (result.deletedCount === 1) {
    // Return the deleted user object
    return isExist;
  } else {
    throw new Error("Failed to delete Brand");
  }
};

export const BrandService = {
  getAllFromDB,
  insertIntoDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
};
