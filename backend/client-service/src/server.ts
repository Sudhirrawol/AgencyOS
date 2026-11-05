import app from "./app.js";

import "dotenv/config";
import connectDB from "./config/db.js";

async function startServer() {
  try {
    await connectDB();
    console.log("Database connected");
    const Port = Number(process.env.PORT ?? 3001);
    app.listen(Port, () => {
      console.log(`server starts on Port ${Port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
startServer();
