import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Users } from "../users/user.model";
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // access to our instance methods
  const isUserExists = await Users.isUserExist(email);

  //check user exists
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist!");
  }

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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "invalid Refresh Token");
  }

  const { userEmail } = verifiedToken;

  // checking deleted user refresh token
  const isUserExist = await Users.isUserExist(userEmail);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userEmail: isUserExist?.email,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // Checking is user exist

  const isUserExist = await Users.findOne({ email: user?.userEmail }).select(
    "+password"
  );
  // check user exits
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exits.");
  }

  // match password
  if (
    isUserExist?.password &&
    !(await Users.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password do not matched!");
  }

  // updating using save() :
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
