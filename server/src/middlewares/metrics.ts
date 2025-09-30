import client from "prom-client";
import { Request, Response } from "express";

// Registry to hold all metrics
const register = new client.Registry();

// Default metrics (CPU, Memory, etc.)
client.collectDefaultMetrics({ register });

// Custom metrics
export const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
});

register.registerMetric(httpRequestDuration);

export const metricsMiddleware = (req: Request, res: Response, next: Function) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    end({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
};

export const metricsEndpoint = async (req: Request, res: Response) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
};
