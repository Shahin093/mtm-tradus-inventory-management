import { z } from "zod";

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
    website: z.string({
      required_error: "website is required!",
    }),
    products: z.string({
      required_error: "ProductID is required!",
    }),
    suppliers: z.string({
      required_error: "Supplier is required!",
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    products: z.string().optional(),
    suppliers: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const BrandValidation = {
  create,
  update,
};
