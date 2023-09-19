import { z } from "zod";

const create = z.object({
  body: z.object({
    productId: z.string({
      required_error: "Product ID is required!",
    }),
    description: z.string({
      required_error: "description is required!",
    }),
    unit: z.string({
      required_error: "Unit is required",
    }),
    imageURL: z.string({
      required_error: "Image is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
    quantity: z.number({
      required_error: "Quantities is required",
    }),
    name: z.string({
      required_error: "Name is required!",
    }),
    status: z.string({
      required_error: "status is required!",
    }),
    store: z.string({
      required_error: "Store is required",
    }),
    suppliedBy: z.string({
      required_error: "SuppliedBy is required!",
    }),
    category: z.string({
      required_error: "category is required!",
    }),
    brand: z.string({
      required_error: "Brand is required!",
    }),
  }),
});

const update = z.object({
  body: z.object({
    productId: z.string().optional(),
    description: z.string().optional(),
    unit: z.string().optional(),
    imageURL: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    store: z.string().optional(),
    suppliedBy: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const StockValidation = {
  create,
  update,
};
