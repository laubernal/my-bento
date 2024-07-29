import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { appendFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';

const LOG_LEVELS: Record<string, string> = {
  Log: 'LOG',
  Error: 'ERROR',
  Warn: 'WARN',
  Debug: 'DEBUG',
  Verbose: 'VERBOSE',
  Fatal: 'FATAL',
};

type LogMessageType = {
  time: string;
  level: string;
  message: string;
  traceId: string;
};

@Injectable()
export class MyBentoLogger implements LoggerService {
  public log(message: string, optionalParams: any[]) {
    const traceId: string = optionalParams[0] ? optionalParams[0] : '';

    const logMessage = this.buildLogMessage('Log', message, traceId);

    console.log(' ------------ LOG MESSAGE ---------------- \n', logMessage);

    this.writeLog(logMessage);
  }

  public error(message: any, optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  public warn(message: any, optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  public debug?(message: any, optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  public verbose?(message: any, optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  public fatal?(message: any, optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  private buildLogMessage(logLevel: string, message: string, traceId: string): LogMessageType {
    return { time: `${new Date().toISOString()}`, level: LOG_LEVELS[logLevel], traceId, message };
  }

  private writeLog(log: LogMessageType): void {
    const logDirectoryPath = '/app/log/';
    const { day, month, year } = this.getCurrentDate();

    const logFilename = `${year}${month}${day}-my-bento-log.log`;
    console.log('LOG FILE', logFilename);

    try {
      if (existsSync(`${logDirectoryPath}${logFilename}`)) {
        console.log('FILE EXISTS');

        appendFileSync(`${logDirectoryPath}${logFilename}`, `${JSON.stringify(log)}\n`);

        return;
      }

      console.log('FILE NOT EXISTS');

      writeFileSync(`${logDirectoryPath}${logFilename}`, `${JSON.stringify(log)}`, {
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
