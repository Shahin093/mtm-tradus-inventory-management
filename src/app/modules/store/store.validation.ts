import { exitOnError } from "winston";
import { z } from "zod";

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    status: z.string({
      required_error: "status is required!",
    }),
    manager: z.string({
      required_error: "manager is required!",
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    status: z.string().optional(),
    manager: z.string().optional(),
  }),
});

export const StoreValidation = {
  create,
  update,
};
