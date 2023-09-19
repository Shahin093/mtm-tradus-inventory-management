"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "FirstName is required!",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is required!",
            }),
            middleName: zod_1.z.string({
                required_error: "Middle Name is required!",
            }),
        }),
        dateOfBirth: zod_1.z.string({
            required_error: "Birth day date is required!",
        }),
        role: zod_1.z.string({
            required_error: "Role is required!",
        }),
        password: zod_1.z.string({
            required_error: "Password is required!",
        }),
        confirmPassword: zod_1.z.string({
            required_error: "Confirm password is required!",
        }),
        gender: zod_1.z.string({
            required_error: "Gender is required!",
        }),
        bloodGroup: zod_1.z.string({
            required_error: "bloodGroup is required!",
        }),
        email: zod_1.z.string({
            required_error: "email is required!",
        }),
        contactNo: zod_1.z.string({
            required_error: "contactNo is required!",
        }),
        emergencyContactNo: zod_1.z.string({
            required_error: "emergencyContactNo is required!",
        }),
        presentAddress: zod_1.z.string({
            required_error: "presentAddress is required!",
        }),
        permanentAddress: zod_1.z.string({
            required_error: "permanentAddress is required!",
        }),
        designation: zod_1.z.string({
            required_error: "designation is required!",
        }),
        profileImage: zod_1.z.string({
            required_error: "profileImage is required!",
        }),
    }),
});
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        }),
        dateOfBirth: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...user_constants_1.gender]).optional(),
        bloodGroup: zod_1.z.enum([...user_constants_1.bloodGroup]).optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.UserZodValidation = {
    createUser,
    updateUser,
};
