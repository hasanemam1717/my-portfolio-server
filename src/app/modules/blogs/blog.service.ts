
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";


const createBlog = async (payload: TBlog) => {
    const result = await BlogModel.create(payload);
    return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
    const queryObj = { ...query };
    let search = '';

    if (query?.search) {
        search = query?.search as string;
    }

    const searchableFields = [
        'title',
        'content'
    ];

    // WE ARE DYNAMICALLY DOING IT USING LOOP
    const searchQuery = BlogModel.find({
        $or: searchableFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' },
        })),
    });
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);


    let sortBy = 'createdAt';
    if (query?.sortBy) {
        sortBy = query.sortBy as string
    }
    const order = query?.sortOrder === 'desc' ? -1 : 1;


    const sortQuery = await searchQuery.sort({ [sortBy]: order });

    return sortQuery;
};

const getSingleBlogs = async (id: string) => {


    const result = await BlogModel.findById(id)
    return result;
};

const updateBlog = async (
    id: string,
    payload: Partial<TBlog>
) => {
    // the blog to be updated
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "The blog you are trying to update, does not exist"
        );
    }
    const result = await BlogModel.findByIdAndUpdate(id, payload, {
        new: true,
    });

    return result;
};



const deleteBlog = async (id: string) => {
    // the blog to be deleted
    const blog = await BlogModel.findByIdAndDelete(id);
    if (!blog) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "The blog you are trying to delete, does not exist"
        );
    }





}
export const blogService = {
    createBlog,
    getAllBlogs,
    getSingleBlogs,
    deleteBlog,
    updateBlog

}