import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import giveawayRoutes from "./routes/giveawayRoutes.js";
import participationRoutes from "./routes/participationRoutes.js";
import winnerRoutes from "./routes/winnerRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : ["http://localhost:5173"],
  credentials: true
}));
app.use(express.json({ limit: "50kb" }));
app.get("/api/health", (_, res) => res.json({ ok: true, service: "veloop-rewards-api" }));
app.use("/api", apiLimiter);
app.use("/api/giveaways", giveawayRoutes);
app.use("/api/giveaways", participationRoutes);
app.use("/api/giveaways", winnerRoutes);
app.use("/api/giveaways", claimRoutes);
app.use(errorHandler);
export default app;
