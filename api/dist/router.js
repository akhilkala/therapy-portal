"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("./controllers/auth");
var admin_1 = require("./controllers/admin");
var router = express_1.default.Router();
router.post("/auth/register", auth_1.register);
router.post("/auth/login", auth_1.login);
router.get("/admin/data", admin_1.getData);
router.delete("/admin/delete-user/:username", admin_1.deleteAccount);
exports.default = router;
