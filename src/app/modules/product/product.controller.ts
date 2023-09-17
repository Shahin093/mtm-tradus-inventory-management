import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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

export const ProductController = {
  insertIntoDB,
};
