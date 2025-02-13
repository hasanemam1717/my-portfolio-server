import { Request, Response } from "express";
import { blogService } from "./blog.service";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const createBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await blogService.createBlog(req.body);
    console.log(req.body);

    sendResponse(res, {
        data: result,
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
    });

})

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await blogService.getAllBlogs(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs are retrieved successfully.',
        data: result,
    });
});

const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogService.getSingleBlogs(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is retrieved successfully',
        data: result,
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const result = await blogService.updateBlog(
        req.params.id,
        req.body
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog is updated successfully',
        data: result,
    });
});


const deleteBlog = catchAsync(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const id = req.params.id
    const result = await blogService.deleteBlog(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog is deleted successfully',
        data: result,
    });
});

export const blogController = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
    updateBlog

}