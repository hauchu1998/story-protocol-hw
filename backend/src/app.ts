import cors from "cors";
import { ethers } from "ethers";
import express from "express";
import winston from "winston";

// const winston = require("winston");
const { combine, timestamp, printf, colorize, align } = winston.format;

const app = express();

// Trust the first proxy
app.set("trust proxy", 1);
app.use(express.json()); // or use bodyParser.json()?

// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
//   optionsSuccessStatus: 204,
// };
app.use(cors());

// Set up logger

function colorizeText(text: string, color: string) {
  const colors: any = {
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    white: "\x1b[37m",
    reset: "\x1b[0m", // Resets the color to default after our colored text
  };

  return `${colors[color]}${text}${colors.reset}`;
}
const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    printf((info: any) => {
      const { timestamp, level, message } = info;

      // Assuming message is in the format: "method: METHOD url: URL body: BODY status: STATUS"
      const parts = message.split(" ");
      const method = colorizeText(parts[1], "green");
      const url = colorizeText(parts[3], "green");
      const body = colorizeText(parts[5], "yellow");
      const status = colorizeText(parts[7], "white");

      return `[${timestamp}] ${level}: method: ${method} url: ${url} body: ${body} status: ${status}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

app.use((req, res, next) => {
  const body = Object.keys(req.body).length ? JSON.stringify(req.body) : "";
  logger.info(
    `method: ${req.method} url: ${req.url} body: ${body} status: ${res.statusCode}`
  );
  next();
});

export default app;
