import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects";
import taskRoutes from "./routes/tasks";
import dashboardRoutes from "./routes/dashboard";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const allowedOrigins = (process.env.CLIENT_URL ?? "http://localhost:5173").split(",").map((origin) => origin.trim()).filter(Boolean);

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
};

app.use(helmet());

app.use(
  express.json({
    limit: "1mb"
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb"
  })
);

app.use(cookieParser());

app.use(cors(corsOptions));

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      environment: process.env.NODE_ENV ?? "development",
      timestamp: new Date().toISOString()
    }
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

export default app;