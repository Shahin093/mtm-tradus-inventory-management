import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { brandFilterableFields } from "./brand.constants";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constrants/pagination";
import { BrandService } from "./brand.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...brandData } = req.body;

  const result = await BrandService.insertIntoDB(brandData);

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: "brand created Successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, brandFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BrandService.getAllFromDB(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: "brands fetched Successfully",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BrandService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "brand fetched Successfully",
    data: result,
  });
});

export const BrandController = {
  getAllFromDB,
  insertIntoDB,
  getByIdFromDB,
};
