import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Users } from "../users/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // access to our instance methods
  const isUserExists = await Users.isUserExist(email);

  //check user exists
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist!");
  }
  const demo = await Users.isPasswordMatched(password, isUserExists?.password);
  console.log("demo: ", demo);
  //match password
  if (
    isUserExists?.password &&
    !(await Users.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password does not matched!");
  }

  const { email: userEmail, role } = isUserExists;

  // create jwt access Token
  const accessToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // create jwt refresh Token
  const refreshToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
