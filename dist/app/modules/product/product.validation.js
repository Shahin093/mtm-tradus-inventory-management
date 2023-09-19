"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        description: zod_1.z.string({
            required_error: "description is required!",
        }),
        unit: zod_1.z.string({
            required_error: "Unit is required!",
        }),
        imageURL: zod_1.z.string({
            required_error: "ImageURL is required!",
        }),
        category: zod_1.z.string({
            required_error: "category is required!",
        }),
        brand: zod_1.z.string({
            required_error: "brand is required!",
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        unit: zod_1.z.string().optional(),
        imageURL: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }),
});
exports.ProductValidation = {
    create,
    update,
};
