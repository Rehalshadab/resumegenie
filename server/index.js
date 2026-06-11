import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateRouter } from "./routes/generate.js";
import { paymentRouter } from "./routes/payment.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.use("/api", generateRouter);
app.use("/api/payment", paymentRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ResumeGenie API is running" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error. Please try again." });
});

app.listen(PORT, () => {
  console.log(`ResumeGenie server running on port ${PORT}`);
});
