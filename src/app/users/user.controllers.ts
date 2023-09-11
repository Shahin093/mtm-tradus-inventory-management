import { Request, Response } from "express";
import { UserService } from "./user.services";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await UserService.insertIntoDB(userData);

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: "User created Successfully",
    data: result,
  });
});

export const UserController = {
  insertIntoDB,
};
