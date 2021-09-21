"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var db_1 = __importDefault(require("./utils/db"));
var router_1 = __importDefault(require("./router"));
var seed_1 = __importDefault(require("./seed"));
var utilities_1 = require("./utils/utilities");
var app = express_1.default();
dotenv_1.default.config();
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
app.use("/", router_1.default);
db_1.default();
seed_1.default();
app.post("/test", utilities_1.upload.single("test"));
app.use("*", function (req, res, next) {
    res.status(404).json({
        message: "Not Found",
    });
});
app.use(function (err, req, res, next) {
    res.status(500).json({
        error: err.message,
    });
});
app.listen(process.env.PORT, function () {
    return console.log("Server running on port " + process.env.PORT + "...");
});
