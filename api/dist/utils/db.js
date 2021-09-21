"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function () {
    if (!process.env.MONGO_URI) {
        throw new Error("Environment Invalid");
    }
    mongoose_1.default.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }, function (err) {
        if (err)
            throw err;
        console.log("Connected to MongoDB");
    });
});
