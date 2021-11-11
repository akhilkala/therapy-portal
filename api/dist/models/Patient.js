"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const patientSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        index: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    history: [
        {
            fileUrl: String,
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    report: [
        {
            therapy: String,
            therapist: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            },
            fileUrl: String,
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    therapies: [{ therapy: String, therapist: mongoose_1.default.Schema.Types.ObjectId }],
});
exports.default = mongoose_1.default.model("Patient", patientSchema);
