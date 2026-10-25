import mongoose from "mongoose";


export const connectDb = async (): Promise<void> => {

    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw new Error('MONGO_URI is missing in .env');
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDb conected succesfully")

} 