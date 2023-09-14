import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { IUserFilters } from "../users/user.interfaces";
import { supplierSearchableFields } from "./supplier.constants";
import { ISupplier } from "./supplier.interface";
import { Supplier } from "./supplier.model";

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

export const SupplierService = {
  insertIntoDB,
  getAllSupplier,
};
