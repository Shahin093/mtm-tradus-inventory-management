import { z } from "zod";

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    description: z.string({
      required_error: "description is required!",
    }),
    unit: z.string({
      required_error: "Unit is required!",
    }),
    imageURL: z.string({
      required_error: "ImageURL is required!",
    }),
    category: z.string({
      required_error: "category is required!",
    }),
    brand: z.string({
      required_error: "brand is required!",
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    unit: z.string().optional(),
    imageURL: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const ProductValidation = {
  create,
  update,
};
