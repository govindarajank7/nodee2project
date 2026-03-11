import mongoose from "mongoose";
import { config } from "dotenv";
config();
const mongo_uri = process.env.MONGO_URI;
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongo_uri);
        console.log('MongoDB Connected');
    } catch(error) {
        console.error("Error in connecting MongoDB:", error.message );
        process.exit(1);
    }
    
}