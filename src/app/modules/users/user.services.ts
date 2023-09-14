import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser, IUserFilters } from "./user.interfaces";
import { Users } from "./user.model";
import { IPaginationOption } from "../../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { userSearchableFields } from "./user.constants";
import { SortOrder } from "mongoose";

const insertIntoDB = async (payload: IUser): Promise<IUser> => {
  const { password: userPassword, confirmPassword } = payload;
  if (userPassword != confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password does not matched!");
  }
  const result = await Users.create(payload);

  return result;
};
// {
//   "password":"103511",
//   "confirmPassword":"103511",
//   "role":"admin",
//   "name": {
//     "firstName":"Shidul",
//     "middleName":"Islam",
//     "lastName":"Shahin"
//   },
//   "dateOfBirth":"07-11-2000",
//   "gender":"male",
//   "bloodGroup":"A+",
//   "email":"sishahin0931@gamil.com",
//   "contactNo":"017746213000",
//   "emergencyContactNo":"018216664116",
//   "presentAddress": "JhulonPol, Madbarhat, Mirsarai, Chittagong",
//   "permanentAddress": "JhulonPol, Madbarhat, Mirsarai, Chittagong & Bangladesh",
//   "designation":"developer",
//   "profileImage":"https://shahin.png"
// }

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IUser[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
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

  const result = await Users.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select("-password")
    .select("-confirmPassword");

  const total = await Users.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await Users.findOne({
    _id: id,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Users.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  })
    .select("-password")
    .select("-confirmPassword");

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const isExist = await Users.findOne({
    _id: id,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const result = await Users.deleteOne(
    { _id: id },
    {
      new: true,
    }
  );

  if (result.deletedCount === 1) {
    // Return the deleted user object
    return isExist;
  } else {
    throw new Error("Failed to delete user");
  }

  // return result;
};

export const UserService = {
  insertIntoDB,
  getAllUsers,
  updateUser,
  deleteUser,
};
