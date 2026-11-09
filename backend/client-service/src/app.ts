import express from "express";
import router from "./routes/client.routes.js";
import cors from "cors";
const app = express();
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(express.json());
app.use("/api/clients", router);
app.get("/api/clients/health", (req, res) => {
  res.status(200).json({
    message: "Client Service is running successfully",
    status: "UP",
  });
});

export default app;
