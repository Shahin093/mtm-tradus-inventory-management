import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};
export type IUser = {
  role: "admin" | "super-admin" | "user";
  password: string;
  confirmPassword: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: "male" | "female";
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  designation: string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, "email" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
