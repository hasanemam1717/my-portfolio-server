import { Router } from "express";
import { blogController } from "./blog.controller";


const blogRoute = Router();

blogRoute.post('/blogs', blogController.createBlog)
blogRoute.get('/blogs', blogController.getAllBlogs)
blogRoute.get('/blogs/:id', blogController.getSingleBlog)
blogRoute.patch('/blogs/:id', blogController.updateBlog)
blogRoute.delete('/blogs/:id', blogController.deleteBlog)

export default blogRoute;