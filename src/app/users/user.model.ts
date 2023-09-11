import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interfaces";

const UserSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      // required: true,
    },
    confirmPassword: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      enum: ["admin", "super-admin", "user"],
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      // required: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    email: {
      type: String,
      // unique: true,
      // required: true,
    },
    contactNo: {
      type: String,
      // unique: true,
      // required: true,
    },
    emergencyContactNo: {
      type: String,
    },
    presentAddress: {
      type: String,
      // required: true,
    },
    permanentAddress: {
      type: String,
      // required: true,
    },
    designation: {
      type: String,
      // required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Users = model<IUser, UserModel>("Users", UserSchema);
