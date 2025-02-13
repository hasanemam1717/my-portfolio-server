import express, { Request, Response } from "express"
import blogRoute from "./app/modules/blogs/blog.route"
import globalErrorHandler from "./utils/globalErrorGandler"
const app = express()

app.use(express.json())

app.use('/', blogRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running 📢')
})
app.use(globalErrorHandler);

export default app

