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
exports.blogService = void 0;
const blog_model_1 = require("./blog.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.create(payload);
    return result;
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    let search = '';
    if (query === null || query === void 0 ? void 0 : query.search) {
        search = query === null || query === void 0 ? void 0 : query.search;
    }
    const searchableFields = [
        'title',
        'content'
    ];
    // WE ARE DYNAMICALLY DOING IT USING LOOP
    const searchQuery = blog_model_1.BlogModel.find({
        $or: searchableFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' },
        })),
    });
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);
    let sortBy = 'createdAt';
    if (query === null || query === void 0 ? void 0 : query.sortBy) {
        sortBy = query.sortBy;
    }
    const order = (query === null || query === void 0 ? void 0 : query.sortOrder) === 'desc' ? -1 : 1;
    const sortQuery = yield searchQuery.sort({ [sortBy]: order });
    return sortQuery;
});
const getSingleBlogs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findById(id);
    return result;
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // the blog to be updated
    const blog = yield blog_model_1.BlogModel.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "The blog you are trying to update, does not exist");
    }
    const result = yield blog_model_1.BlogModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // the blog to be deleted
    const blog = yield blog_model_1.BlogModel.findByIdAndDelete(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "The blog you are trying to delete, does not exist");
    }
});
exports.blogService = {
    createBlog,
    getAllBlogs,
    getSingleBlogs,
    deleteBlog,
    updateBlog
};
