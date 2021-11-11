"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./utils/db"));
const router_1 = __importDefault(require("./router"));
const seed_1 = __importDefault(require("./seed"));
const utilities_1 = require("./utils/utilities");
const app = express_1.default();
dotenv_1.default.config();
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use("/src/uploads", express_1.default.static("src/uploads"));
app.use("/", router_1.default);
db_1.default();
seed_1.default();
app.post("/test", utilities_1.upload.single("test"));
app.use("*", (req, res, next) => {
    res.status(404).json({
        message: "Not Found",
    });
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: err.message,
        message: "Something went wrong",
    });
});
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}...`));
// who all can see patient history
// who all can see patient reports
// who all can see patient data
// delet pdfs on delect account
// { value: "0", label: "Vision Therapy" },
// { value: "1", label: "Speech Therapy" },
// { value: "2", label: "Occupational Therapy" },
// { value: "3", label: "Play & Art Therapy" },
// { value: "4", label: "Counselling" },
// { value: "5", label: "Clinical Psycology" },
// { value: "6", label: "Special Education" },
// { value: "7", label: "Vocational Training" },
// Change password
// Forget password
// add email to model
