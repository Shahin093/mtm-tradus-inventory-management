import { z } from "zod";

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

export const SupplierValidation = {
  create,
};
