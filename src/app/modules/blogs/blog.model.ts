import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';

// Define the BlogPost schema
const blogSchema = new Schema<TBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    like: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true,
});

export const BlogModel = model<TBlog>('BlogPost', blogSchema);

