"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierValidation = void 0;
const zod_1 = require("zod");
const supplier_constants_1 = require("./supplier.constants");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is Required!",
        }),
        email: zod_1.z.string({
            required_error: "email is required",
        }),
        // brand: z.string({
        //     required_error: 'Brand is required'
        // }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required!",
        }),
        emergencyContactNumber: zod_1.z.string({
            required_error: "emergencyContactNumber is required!",
        }),
        tradeLicenseNumber: zod_1.z.number({
            required_error: "tradeLicenseNumber is required",
        }),
        presentAddress: zod_1.z.string({
            required_error: "presentAddress is required!",
        }),
        location: zod_1.z.string({
            required_error: "Location is required",
        }),
        status: zod_1.z.string({
            required_error: "status is required!",
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        // brand: z.string({
        //     required_error: 'Brand is required'
        // }),
        contactNumber: zod_1.z.string().optional(),
        emergencyContactNumber: zod_1.z.string().optional(),
        tradeLicenseNumber: zod_1.z.number().optional(),
        presentAddress: zod_1.z.string().optional(),
        location: zod_1.z.enum([...supplier_constants_1.location]).optional(),
        status: zod_1.z.enum([...supplier_constants_1.status]).optional(),
    }),
});
exports.SupplierValidation = {
    create,
    update,
};
