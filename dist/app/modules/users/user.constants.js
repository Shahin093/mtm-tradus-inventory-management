"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodGroup = exports.gender = exports.userSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = [
    "searchTerm",
    "id",
    "gender",
    "bloodGroup",
    "email",
    "contactNo",
    "emergencyContactNo",
    "managementDepartment",
    "designation",
];
exports.userSearchableFields = [
    "email",
    "contactNo",
    "emergencyContactNo",
    "name.firstName",
    "name.lastName",
    "name.middleName",
];
exports.gender = ["male", "female"];
exports.bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
