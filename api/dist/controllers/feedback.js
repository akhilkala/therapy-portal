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
exports.getByUserId = exports.postFeedback = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
const utilities_1 = require("../utils/utilities");
require("dotenv").config();
exports.postFeedback = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    const feedback = yield new Feedback_1.default({
        user: req.user._id,
        message,
    }).save();
    res.status(200).json(feedback);
}));
exports.getByUserId = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield Feedback_1.default.find({ user: req.user._id });
    res.status(200).json(feedback);
}));
