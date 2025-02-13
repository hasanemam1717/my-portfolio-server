import app from './app';
import mongoose from 'mongoose';

main().catch((err) => console.log(err));
const port = 5000

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://my-portfolio:000123@cluster0.9fglmuq.mongodb.net/my-portfolio?retryWrites=true&w=majority&appName=Cluster0`);
        app.listen(port, () => {
            console.log(`Server is running on Port${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}