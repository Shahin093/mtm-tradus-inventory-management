"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string({
            required_error: "Product ID is required!",
        }),
        description: zod_1.z.string({
            required_error: "description is required!",
        }),
        unit: zod_1.z.string({
            required_error: "Unit is required",
        }),
        imageURL: zod_1.z.string({
            required_error: "Image is required",
        }),
        price: zod_1.z.number({
            required_error: "Price is required",
        }),
        quantity: zod_1.z.number({
            required_error: "Quantities is required",
        }),
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        status: zod_1.z.string({
            required_error: "status is required!",
        }),
        store: zod_1.z.string({
            required_error: "Store is required",
        }),
        suppliedBy: zod_1.z.string({
            required_error: "SuppliedBy is required!",
        }),
        category: zod_1.z.string({
            required_error: "category is required!",
        }),
        brand: zod_1.z.string({
            required_error: "Brand is required!",
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        unit: zod_1.z.string().optional(),
        imageURL: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        quantity: zod_1.z.number().optional(),
        name: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        store: zod_1.z.string().optional(),
        suppliedBy: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }),
});
exports.StockValidation = {
    create,
    update,
};
