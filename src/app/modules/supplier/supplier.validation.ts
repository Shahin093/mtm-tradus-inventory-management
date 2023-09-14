import { z } from "zod";
import { location, status } from "./supplier.constants";

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is Required!",
    }),
    email: z.string({
      required_error: "email is required",
    }),
    // brand: z.string({
    //     required_error: 'Brand is required'
    // }),
    contactNumber: z.string({
      required_error: "Contact Number is required!",
    }),
    emergencyContactNumber: z.string({
      required_error: "emergencyContactNumber is required!",
    }),
    tradeLicenseNumber: z.number({
      required_error: "tradeLicenseNumber is required",
    }),
    presentAddress: z.string({
      required_error: "presentAddress is required!",
    }),
    location: z.string({
      required_error: "Location is required",
    }),
    status: z.string({
      required_error: "status is required!",
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    // brand: z.string({
    //     required_error: 'Brand is required'
    // }),
    contactNumber: z.string().optional(),
    emergencyContactNumber: z.string().optional(),
    tradeLicenseNumber: z.number().optional(),
    presentAddress: z.string().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    status: z.enum([...status] as [string, ...string[]]).optional(),
  }),
});
export const SupplierValidation = {
  create,
  update,
};
