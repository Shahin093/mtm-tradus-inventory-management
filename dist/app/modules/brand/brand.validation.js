"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        email: zod_1.z.string({
            required_error: "Email is required!",
        }),
        website: zod_1.z.string({
            required_error: "website is required!",
        }),
        products: zod_1.z.string({
            required_error: "ProductID is required!",
        }),
        suppliers: zod_1.z.string({
            required_error: "Supplier is required!",
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        website: zod_1.z.string().optional(),
        products: zod_1.z.string().optional(),
        suppliers: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
    }),
});
exports.BrandValidation = {
    create,
    update,
};
