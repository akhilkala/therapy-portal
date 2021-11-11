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
exports.updateUserData = exports.getUserData = exports.uploadUserHistory = exports.postPatientData = exports.deleteAccount = exports.getData = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
const User_1 = __importDefault(require("../models/User"));
const Patient_1 = __importDefault(require("../models/Patient"));
const utilities_1 = require("../utils/utilities");
require("dotenv").config();
exports.getData = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [users, feedback] = yield Promise.all([
        User_1.default.find().select("username isTeacher isAdmin").lean(),
        Feedback_1.default.find().populate("user", "username").lean(),
    ]);
    res.status(200).json({
        users,
        feedback,
    });
}));
exports.deleteAccount = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.deleteOne({ _id: req.params.id });
    yield Patient_1.default.deleteOne({ user: req.params.id });
    yield Feedback_1.default.deleteMany({ user: req.params.id });
    res.status(200).json({
        message: "User deleted",
    });
}));
exports.postPatientData = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.uploadUserHistory = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findOne({ username: req.body.username }).lean();
    if (!user || user.isTeacher) {
        return res.status(400).json({ message: "Patient does not exist" });
    }
    if (!process.env.DOMAIN_NAME)
        throw new Error("Environment Invalid");
    const fileUrl = process.env.DOMAIN_NAME + "/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    yield Patient_1.default.updateOne({ user: user._id }, {
        $push: {
            history: {
                fileUrl,
            },
        },
    });
    res.status(200).json({ success: true });
}));
exports.getUserData = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username: req.params.username }).lean();
    console.log(user);
    if (!user || user.isTeacher) {
        return res.status(400).json({ message: "Patient does not exist" });
    }
    const data = yield Patient_1.default.findOne({ user: user._id })
        .populate("user")
        .lean();
    res.status(200).json(data);
}));
exports.updateUserData = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username: req.body.username });
    console.log("user");
    console.log(req.body.username);
    console.log("user");
    yield User_1.default.updateOne({ _id: user._id }, { fullName: req.body.fullName });
    yield Patient_1.default.updateOne({ user: user._id }, {
        age: req.body.age,
        gender: req.body.gender,
    });
    res.status(200).json({ success: true });
}));
