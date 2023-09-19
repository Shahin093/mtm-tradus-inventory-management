"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/users/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const supplier_route_1 = require("../modules/supplier/supplier.route");
const brand_route_1 = require("../modules/brand/brand.route");
const product_route_1 = require("../modules/product/product.route");
const store_router_1 = require("../modules/store/store.router");
const stock_route_1 = require("../modules/stock/stock.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/suppliers",
        route: supplier_route_1.SupplierRoutes,
    },
    {
        path: "/brands",
        route: brand_route_1.BrandRoutes,
    },
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/stores",
        route: store_router_1.StoreRoutes,
    },
    {
        path: "/stocks",
        route: stock_route_1.StockRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
