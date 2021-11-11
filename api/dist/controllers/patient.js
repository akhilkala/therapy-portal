"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReports = exports.postHistory = void 0;
const Patient_1 = __importDefault(require("../models/Patient"));
const utilities_1 = require("../utils/utilities");
require("dotenv").config();
exports.postHistory = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield Patient_1.default.updateOne({ user: req.body.userId }, {
        $push: {
            history: {
                fileUrl: req.body.files[0],
            },
        },
    }, { new: true, upsert: true });
    res.status(200).json(patient);
}));
exports.getReports = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield Patient_1.default.findOne({ user: req.user._id })
        .populate("report.therapist", "fullName")
        .lean();
    res.status(200).json(patient.report);
}));
