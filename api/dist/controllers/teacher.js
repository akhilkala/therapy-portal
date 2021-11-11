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
exports.getUserDataById = exports.getUserDataByUsername = exports.postReport = void 0;
const Patient_1 = __importDefault(require("../models/Patient"));
const User_1 = __importDefault(require("../models/User"));
const utilities_1 = require("../utils/utilities");
require('dotenv').config();
exports.postReport = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findOne({ username: req.body.username });
    if (!user || user.isTeacher) {
        return res.status(400).json({ message: 'Patient does not exist' });
    }
    if (!process.env.DOMAIN_NAME)
        throw new Error('Environment Invalid');
    const fileUrl = process.env.DOMAIN_NAME + '/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    yield Patient_1.default.updateOne({ user: user._id }, {
        $push: {
            report: {
                therapist: req.user._id,
                therapy: req.body.therapy,
                fileUrl,
            },
        },
    });
    res.status(200).json({ success: true });
}));
exports.getUserDataByUsername = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username: req.params.username });
    if (!user || user.isTeacher) {
        return res.status(400).json({ message: 'Patient does not exist' });
    }
    const patient = yield Patient_1.default.findOne({ user: user._id })
        .populate('user report.therapist')
        .lean();
    res.status(200).json(patient);
}));
exports.getUserDataById = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById({ _id: req.params.id });
    if (!user || !user.isTeacher) {
        return res.status(400).json({ message: 'Therapist does not exist' });
    }
    res.status(200).json(user);
}));
