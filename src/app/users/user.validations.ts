// import { z } from "zod";

// const createUser = z.object({
//   body: z.object({
//     name: z.object({
//       firstName: z.string({
//         required_error: "FirstName is required!",
//       }),
//       lastName: z.string({
//         required_error: "Last Name is required!",
//       }),
//       middleName: z.string({
//         required_error: "Middle Name is required!",
//       }),
//     }),
//     dateOfBirth: z.string({
//       required_error: "Birth day date is required!",
//     }),
//     role: z.string({
//       required_error: "Role is required!",
//     }),
//     password: z.string({
//       required_error: "Password is required!",
//     }),
//     confirmPassword: z.string({
//       required_error: "Confirm password is required!",
//     }),
//     gender: z.string({
//       required_error: "Gender is required!",
//     }),
//     bloodGroup: z.string({
//       required_error: "bloodGroup is required!",
//     }),
//     email: z.string({
//       required_error: "email is required!",
//     }),
//     contactNo: z.string({
//       required_error: "contactNo is required!",
//     }),
//     emergencyContactNo: z.string({
//       required_error: "emergencyContactNo is required!",
//     }),
//     presentAddress: z.string({
//       required_error: "presentAddress is required!",
//     }),
//     permanentAddress: z.string({
//       required_error: "permanentAddress is required!",
//     }),
//     designation: z.string({
//       required_error: "designation is required!",
//     }),
//     profileImage: z.string({
//       required_error: "profileImage is required!",
//     }),
//   }),
// });

// const updateUser = z.object({
//   body: z.object({
//     name: z.object({
//       firstName: z.string().optional(),
//       lastName: z.string().optional(),
//       middleName: z.string().optional(),
//     }),

//     dateOfBirth: z.string().optional(),

//     gender: z.string().optional(),

//     bloodGroup: z.string().optional(),

//     email: z.string().email().optional(),

//     contactNo: z.string().optional(),

//     emergencyContactNo: z.string().optional(),

//     presentAddress: z.string().optional(),

//     permanentAddress: z.string().optional(),

//     designation: z.string().optional(),

//     profileImage: z.string().optional(),
//   }),
// });

// export const UserZodValidation = {
//   createUser,
//   updateUser,
// };
