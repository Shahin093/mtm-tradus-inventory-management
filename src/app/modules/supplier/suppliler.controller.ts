import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SupplierService } from "./supplier.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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

export const SupplierController = {
  insertIntoDB,
};
