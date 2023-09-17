import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { productFilterableFields } from "./product.constants";
import { paginationFields } from "../../../constrants/pagination";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...productsData } = req.body;

  const result = await ProductService.insertIntoDB(productsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created Successfully.",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductService.getAllFromDB(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: "Products fetched Successfully",
    data: result,
  });
});

export const ProductController = {
  insertIntoDB,
  getAllFromDB,
};
