import app from "./app.js";

import "dotenv/config";

import mongoose from "mongoose";
import { producer } from "./config/kafka.js";

const PORT = Number(process.env.PORT) || 3002;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URi is missing");
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDb connected successfully");

    await producer.connect();

    console.log("Kafka producer connected succesfully");

    app.listen(PORT, () => {
      console.log(`Project Service running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server startup failed", error);
    process.exit(1);
  }
}

startServer();
