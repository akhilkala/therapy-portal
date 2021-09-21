"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.route = void 0;
var multer_1 = __importDefault(require("multer"));
var route = function (fn) { return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
}; };
exports.route = route;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "application/pdf")
        cb(null, true);
    else
        cb(null, false);
};
exports.upload = multer_1.default({
    storage: storage,
    fileFilter: fileFilter,
});
