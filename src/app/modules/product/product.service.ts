import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { productSearchableFields } from "./product.constants";
import { IProduct, IProductFilters } from "./product.interface";
import { Product } from "./product.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

// {
//     "name":"rowel ciment",
//     "description": "it is very helpfull in our country. it need to create building , house.",
//     "unit":"KG",
//     "imageURL":"shain.jpg",
//     "category":"sera",
//     "brand":"65068a04ec5011a0b8354295"
//   }
const insertIntoDB = async (payload: IProduct): Promise<IProduct> => {
  const result = (await Product.create(payload)).populate("brand");

  return result;
};

const getAllFromDB = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map((field) => ({
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

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("brand");
  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id).populate("brand");
  return result;
};

const updateFromDB = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const isExist = await Product.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product does not exist!");
  }

  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("brand");
  return result;
};

const deleteFromDB = async (id: string): Promise<IProduct | null> => {
  const isExist = await Product.findOne({
    _id: id,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "product does not found !");
  }
  const result = await Product.deleteOne(
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

export const ProductService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
};
