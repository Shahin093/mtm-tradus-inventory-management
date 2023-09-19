"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        status: zod_1.z.string({
            required_error: "status is required!",
        }),
        manager: zod_1.z.string({
            required_error: "manager is required!",
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        manager: zod_1.z.string().optional(),
    }),
});
exports.StoreValidation = {
    create,
    update,
};
