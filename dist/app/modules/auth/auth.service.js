"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../users/user.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // access to our instance methods
    const isUserExists = yield user_model_1.Users.isUserExist(email);
    //check user exists
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist!");
    }
    //match password
    if ((isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password) &&
        !(yield user_model_1.Users.isPasswordMatched(password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password does not matched!");
    }
    const { email: userEmail, role } = isUserExists;
    // create jwt access Token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // create jwt refresh Token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "invalid Refresh Token");
    }
    const { userEmail } = verifiedToken;
    // checking deleted user refresh token
    const isUserExist = yield user_model_1.Users.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    // generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        userEmail: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // Checking is user exist
    const isUserExist = yield user_model_1.Users.findOne({ email: user === null || user === void 0 ? void 0 : user.userEmail }).select("+password");
    // check user exits
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exits.");
    }
    // match password
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) &&
        !(yield user_model_1.Users.isPasswordMatched(oldPassword, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password do not matched!");
    }
    // updating using save() :
    isUserExist.save();
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};
