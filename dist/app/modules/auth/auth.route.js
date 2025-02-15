"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authRoute = (0, express_1.Router)();
authRoute.post('/register', auth_controller_1.authController.register);
authRoute.post('/login', auth_controller_1.authController.logIn);
exports.default = authRoute;
