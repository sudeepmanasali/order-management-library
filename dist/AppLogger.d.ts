import { Logger } from "winston";
export default class AppLogger {
    static logger: Logger;
    static readonly LOG_LEVEL = "info";
    static getLogger(moduleName: string): Logger;
}
