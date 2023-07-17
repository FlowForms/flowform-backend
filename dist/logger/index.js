"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logging_winston_1 = require("@google-cloud/logging-winston");
const winston_1 = require("winston");
const config_1 = __importDefault(require("../config"));
const { environment } = (0, config_1.default)();
const { colorize, combine, errors, printf, splat, timestamp } = winston_1.format;
exports.logger = (0, winston_1.createLogger)({
    level: "info",
    transports: environment !== "dev"
        ? [new logging_winston_1.LoggingWinston({})]
        : [
            new winston_1.transports.Console({
                format: combine(colorize({ all: true }), errors({ stack: true }), splat(), timestamp({
                    format: "YYYY-DD-MM HH:mm:ss",
                }), printf(({ level, message, timestamp, source }) => {
                    return `${timestamp} [${level}] [${source}] : ${message}`;
                })),
            }),
        ],
});
//# sourceMappingURL=index.js.map