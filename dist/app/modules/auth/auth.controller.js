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
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.registerUser(req.body);
    const _id = result === null || result === void 0 ? void 0 : result._id;
    const name = result === null || result === void 0 ? void 0 : result.name;
    const email = result === null || result === void 0 ? void 0 : result.email;
    const data = { _id, name, email };
    (0, sendResponse_1.default)(res, {
        statusCode: (http_status_1.default.CREATED), success: true, message: "User is created.",
        data: data
    });
}));
const logIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.logIn(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: (http_status_1.default.CREATED),
        success: true,
        message: "Login successful.",
        data: result
    });
}));
exports.authController = {
    register,
    logIn,
};
