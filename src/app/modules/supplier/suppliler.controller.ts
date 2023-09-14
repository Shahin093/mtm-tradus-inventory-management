import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SupplierService } from "./supplier.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { supplierFilterableFields } from "./supplier.constants";
import { paginationFields } from "../../../constrants/pagination";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...supplierData } = req.body;

  const result = await SupplierService.insertIntoDB(supplierData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Supplier created Successfully.",
    data: result,
  });
});

const getAllSupplier = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, supplierFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SupplierService.getAllSupplier(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: "Supplier fetched Successfully",
    data: result,
  });
});
export const SupplierController = {
  insertIntoDB,
  getAllSupplier,
};
