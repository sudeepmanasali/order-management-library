"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, json } = winston_1.format;
class AppLogger {
    static getLogger(moduleName) {
        return (0, winston_1.createLogger)({
            level: this.LOG_LEVEL,
            format: combine(timestamp(), label({ label: moduleName, message: false }), json(), winston_1.format.printf((info) => {
                return `${info.timestamp}: ${info.level}: [${info.label}] ${JSON.stringify(info.message)}`;
            })),
            transports: [
                new winston_1.transports.Console()
            ]
        });
    }
}
AppLogger.LOG_LEVEL = 'info';
exports.default = AppLogger;
