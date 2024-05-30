"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = require("./routes/Routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(Routes_1.router);
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
module.exports = app;
