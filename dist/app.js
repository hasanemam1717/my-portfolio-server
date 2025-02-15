"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_route_1 = __importDefault(require("./app/modules/blogs/blog.route"));
const globalErrorGandler_1 = __importDefault(require("./utils/globalErrorGandler"));
const auth_route_1 = __importDefault(require("./app/modules/auth/auth.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(cookieParser())
app.use((0, cors_1.default)({ origin: 'https://porifolio-eta.vercel.app', credentials: true }));
app.use('/', blog_route_1.default);
app.use('/', auth_route_1.default);
app.get('/', (req, res) => {
    res.send('Server is running 📢');
});
app.use(globalErrorGandler_1.default);
exports.default = app;
