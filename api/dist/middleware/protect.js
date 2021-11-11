"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
exports.default = (role = "user") => {
    return (req, res, next) => {
        var _a, _b;
        try {
            if (!process.env.SECRET)
                throw new Error("Environment Invalid");
            if (!req.user) {
                const token = ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]) || "";
                jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, user) => {
                    if (err)
                        return res.sendStatus(403);
                    req.user = user;
                });
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
};
