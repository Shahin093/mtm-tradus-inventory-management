"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    // constructor(statusCode: number, message: string | undefined, stack = '') {
    //   super(message);
    //   this.statusCode = statusCode;
    //   if (stack) {
    //     this.stack = stack;
    //   } else {
    //     Error.captureStackTrace(this, this.constructor);
    //   }
    // }
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            console.log(this.message);
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
