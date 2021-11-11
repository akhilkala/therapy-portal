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
exports.token = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utilities_1 = require("../utils/utilities");
const Patient_1 = __importDefault(require("../models/Patient"));
require("dotenv").config();
exports.register = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, username, password, isTeacher, age, gender, therapies } = req.body;
    if (!isTeacher) {
        for (let i = 0; i < therapies.length; i++) {
            const username = therapies[i].therapist;
            const check = yield User_1.default.findOne({ username });
            if (!check || !check.isTeacher) {
                return res.status(401).json({
                    message: `${username} is not a therapist`,
                });
            }
            therapies[i]["therapist"] = check._id;
        }
    }
    const exisitngUser = yield User_1.default.findOne({ username });
    if (exisitngUser) {
        return res.status(401).json({
            message: "Username is already in use",
        });
    }
    const user = yield new User_1.default({
        fullName,
        username,
        password,
        isTeacher: !!isTeacher,
    }).save();
    if (!isTeacher) {
        yield new Patient_1.default({
            user: user._id,
            age,
            gender,
            therapies,
        }).save();
    }
    res.status(200).json({
        message: "User Created Succesfully",
    });
}));
exports.login = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User_1.default.findOne({ username }).select("+password").lean();
    if (!user) {
        return res.status(401).json({
            message: "Username or Password is Incorrect",
        });
    }
    const check = yield bcrypt_1.default.compare(password, user.password);
    if (!check) {
        return res.status(401).json({
            message: "Username or Password is Incorrect",
        });
    }
    if (!process.env.SECRET || !process.env.SECRET_2)
        throw new Error("Environment Invalid");
    let payload = Object.assign(Object.assign({}, user), { password: undefined });
    if (!user.isTeacher && !user.isAdmin) {
        const patient = yield Patient_1.default.findOne({ user: user._id }).populate("therapies._id", "fullName");
        payload["patient"] = patient;
    }
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET
    // { expiresIn: "15s" }
    );
    // const refreshToken = jwt.sign(
    //   { ...user, password: undefined },
    //   process.env.SECRET_2
    // );
    // const refreshToken = jwt.sign({ user: user._id }, process.env.SECRET_2, {
    //   expiresIn: '7d',
    // });
    res.status(200).send({
        token: accessToken,
    });
}));
exports.token = utilities_1.route((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
