import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { stockSearchableFields } from "./stock.constants";
import { IStock, IStockFilters } from "./stock.interface";
import { Stock } from "./stock.model";

// {
//   "productId":"65068a3b061412e31585e7ac",
//   "store":"650930b4eb82587724c912b0",
//   "name":"CIMENT",
//   "description": "it is very helpfull for us",
//   "unit":"KG",
//   "imageURL":"https://shain.jpg",
//   "price": 670,
//   "quantity":50,
//   "status": "in-stock",
//   "suppliedBy": "650299d5b8211a408dbdd56d",
//   "category":"Big saller",
//   "brand":"65068a04ec5011a0b8354295"

// }
const insertIntoDB = async (payload: IStock): Promise<IStock> => {
  const result = (
    await (
      await (
        await (await Stock.create(payload)).populate("brand")
      ).populate("suppliedBy")
    ).populate("productId")
  ).populate("store");

  return result;
};

const getAllFromDB = async (
  filters: IStockFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IStock[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: stockSearchableFields.map((field) => ({
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

  const result = await Stock.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("brand")
    .populate("suppliedBy")
    .populate("productId")
    .populate("store");
  const total = await Stock.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const StockService = {
  insertIntoDB,
  getAllFromDB,
};
