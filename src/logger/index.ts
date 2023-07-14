import { LoggingWinston } from "@google-cloud/logging-winston";
import { createLogger, format, transports } from "winston";

import config from "../config";

const { environment } = config();

const { colorize, combine, errors, printf, splat, timestamp } = format;

export const logger = createLogger({
  level: "info",
  transports:
    environment !== "dev"
      ? [new LoggingWinston({})]
      : [
        new transports.Console({
          format: combine(
            colorize({ all: true }),
            errors({ stack: true }),
            splat(),
            timestamp({
              format: "YYYY-DD-MM HH:mm:ss",
            }),
            printf(({ level, message, timestamp, source }) => {
              return `${timestamp} [${level}] [${source}] : ${message}`;
            }),
          ),
        }),
      ],
});

