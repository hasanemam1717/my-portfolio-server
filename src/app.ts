import express, { Request, Response } from "express"
import blogRoute from "./app/modules/blogs/blog.route"
import globalErrorHandler from "./utils/globalErrorGandler"
import authRoute from "./app/modules/auth/auth.route"
import cors from 'cors'
const app = express()

app.use(express.json())
// app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/', blogRoute)
app.use('/', authRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running 📢')
})
app.use(globalErrorHandler);

export default app

