import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Simple health check - minimal API for production monitoring
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      message: "Memorial Website - Frontend Ready",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  return app;
}
