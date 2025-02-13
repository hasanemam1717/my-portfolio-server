import mongoose from "mongoose";

export interface TBlog {
    title: string;
    content: string;
    category: string;
    image?: string;
    like: number
}