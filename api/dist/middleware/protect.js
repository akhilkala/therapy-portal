"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
exports.default = (function (role) {
    if (role === void 0) { role = "user"; }
    return function (req, res, next) {
        var _a, _b;
        try {
            if (!process.env.SECRET || !process.env.ADMIN_TOKEN)
                throw new Error("Environment Invalid");
            if (!req.user) {
                var token = ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]) || "";
                var user = jsonwebtoken_1.default.verify(token, process.env.SECRET);
                req.user = user;
            }
            if (role == "admin" && !req.user.isAdmin)
                throw new Error();
            if (role == "teacher" && !(req.user.isTeacher || req.user.isAdmin))
                throw new Error();
            next();
        }
        catch (err) {
            res.status(401).json({
                message: "Auth Failed",
            });
        }
    };
});
