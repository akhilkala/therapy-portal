"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTherapy = exports.upload = exports.route = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const route = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.route = route;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, uuid_1.v4() + ".pdf");
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf")
        cb(null, true);
    else
        cb(null, false);
};
exports.upload = multer_1.default({
    storage,
    fileFilter,
});
const getTherapy = (key) => {
    const therapies = {
        "0": "Vision Therapy",
        "1": "Speech Therapy",
        "2": "Occupational Therapy",
        "3": "Play & Art Therapy",
        "4": "Counselling",
        "5": "Clinical Psycology",
        "6": "Special Education",
        "7": "Vocational Training",
    };
    //@ts-ignore
    return therapies[key];
};
exports.getTherapy = getTherapy;
