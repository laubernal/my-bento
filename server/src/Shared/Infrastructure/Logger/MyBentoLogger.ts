import { Injectable, LoggerService } from '@nestjs/common';
import { appendFileSync, existsSync, writeFileSync } from 'fs';
import { LogMessageType } from '../Types';

enum LOG_LEVELS {
  Log = 'LOG',
  Error = 'ERROR',
  Warn = 'WARN',
  Debug = 'DEBUG',
  Verbose = 'VERBOSE',
  Fatal = 'FATAL',
}

@Injectable()
export class MyBentoLogger implements LoggerService {
  public log(message: string, optionalParams: any[]) {
    const traceId: string = optionalParams[0] ? optionalParams[0] : '';

    const logMessage = this.buildLogMessage(LOG_LEVELS.Log, message, traceId);

    this.writeLog(logMessage);
  }

  public error(message: any, optionalParams: any[]) {
    const traceId: string = optionalParams[0] ? optionalParams[0] : '';

    const logMessage = this.buildLogMessage(LOG_LEVELS.Error, message, traceId);

    this.writeLog(logMessage);
  }

  public warn(message: any, optionalParams: any[]) {
    const traceId: string = optionalParams[0] ? optionalParams[0] : '';

    const logMessage = this.buildLogMessage(LOG_LEVELS.Warn, message, traceId);

    this.writeLog(logMessage);
  }

  public debug?(message: any, optionalParams: any[]) {
    const traceId: string = optionalParams[0] ? optionalParams[0] : '';

    const logMessage = this.buildLogMessage(LOG_LEVELS.Debug, message, traceId);

    this.writeLog(logMessage);
  }

  public verbose?(message: any, optionalParams: any[]) {
    const traceId: string = optionalParams[0] ? optionalParams[0] : '';

    const logMessage = this.buildLogMessage(LOG_LEVELS.Verbose, message, traceId);

    this.writeLog(logMessage);
  }

  public fatal?(message: any, optionalParams: any[]) {
    const traceId: string = optionalParams[0] ? optionalParams[0] : '';

    const logMessage = this.buildLogMessage(LOG_LEVELS.Fatal, message, traceId);

    this.writeLog(logMessage);
  }

  private buildLogMessage(logLevel: string, message: string, traceId: string): LogMessageType {
    return { time: `${new Date().toISOString()}`, level: logLevel, traceId, message };
  }

  private writeLog(log: LogMessageType): void {
    const logDirectoryPath = '/app/log/';
    const { day, month, year } = this.getCurrentDate();

    const logFilename = `${year}${month}${day}-my-bento-log.log`;

    try {
      if (existsSync(`${logDirectoryPath}${logFilename}`)) {
        appendFileSync(`${logDirectoryPath}${logFilename}`, `${JSON.stringify(log)}\n`);

        return;
      }

      writeFileSync(`${logDirectoryPath}${logFilename}`, `${JSON.stringify(log)}\n`, {
        encoding: 'utf8',
      });
    } catch (err) {
      console.error('Error writing log message:', err);
    }
  }

  private getCurrentDate(): { day: string; month: string; year: string } {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    return { day, month, year };
  }
}
