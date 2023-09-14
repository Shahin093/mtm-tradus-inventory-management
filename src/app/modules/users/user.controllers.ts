import { Request, Response } from "express";
import { UserService } from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constants";
import { paginationFields } from "../../../constrants/pagination";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await UserService.insertIntoDB(userData);
  // Clone the result object
  const resultClone = { ...result.toObject() };

  // Remove the 'password' field from the clone
  const { password, ...others } = resultClone;
  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: "User created Successfully",
    data: others,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: "User fetched Successfully",
    data: result,
  });
});

export const UserController = {
  insertIntoDB,
  getAllUsers,
};
