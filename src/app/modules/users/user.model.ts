import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interfaces";
import bcrypt from "bcrypt";

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

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await Users.findOne(
    { email: email },
    { password: 1, email: 1, role: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing password
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 12);

  next();
});

export const Users = model<IUser, UserModel>("Users", UserSchema);
