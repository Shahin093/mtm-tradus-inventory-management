import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { IUserFilters } from "../users/user.interfaces";
import { supplierSearchableFields } from "./supplier.constants";
import { ISupplier } from "./supplier.interface";
import { Supplier } from "./supplier.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

// {
//   "name":"Raju",
//   "email":"raju@gamil.com",
//   "contactNumber":"0199384434",
//   "emergencyContactNumber":"837483748",
//   "tradeLicenseNumber":8875,
//   "presentAddress":"jhulon",
//   "permanentAddress":"Dhaka",
//   "location": "Dhaka",
//   "imageURL":"https://shahin.png",
//   "nationalIdImageURL":"https://shahin.png",
//   "status":"active"
//   }
const insertIntoDB = async (payload: ISupplier): Promise<ISupplier> => {
  const result = await Supplier.create(payload);

  return result;
};

const getAllSupplier = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<ISupplier[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: supplierSearchableFields.map((field) => ({
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

  const result = await Supplier.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Supplier.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSupplier = async (id: string): Promise<ISupplier | null> => {
  const result = await Supplier.findById(id);
  return result;
};

const deleteFromDB = async (id: string): Promise<ISupplier> => {
  const isExistSupplier = await Supplier.findOne({ _id: id });

  if (!isExistSupplier) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Supplier is not exist");
  }

  const result = await Supplier.deleteOne(
    { _id: id },
    {
      new: true,
    }
  );

  if (result.deletedCount === 1) {
    // Return the deleted user object
    return isExistSupplier;
  } else {
    throw new Error("Failed to delete user");
  }
};

const updateSuppler = async (
  id: string,
  payload: Partial<ISupplier>
): Promise<ISupplier | null> => {
  const isExist = await Supplier.findOne({
    _id: id,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Suppler not found !");
  }

  const result = await Supplier.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const SupplierService = {
  insertIntoDB,
  getAllSupplier,
  getSingleSupplier,
  deleteFromDB,
  updateSuppler,
};
