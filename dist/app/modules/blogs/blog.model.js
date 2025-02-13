"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
// Define the BlogPost schema
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    like: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true,
});
exports.BlogModel = (0, mongoose_1.model)('BlogPost', blogSchema);
