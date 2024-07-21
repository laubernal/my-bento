import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';

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
  public log(message: any, ...optionalParams: any[]) {
    const traceId: string = optionalParams[0] ? optionalParams[0] : '';

    const logMessage = this.buildLogMessage('Log', message, traceId);

    console.log(' ------------ LOG MESSAGE ---------------- \n', logMessage);

    // WRITE LOG IN FILE
    // this.writeLog(logMessage);
  }

  public error(message: any, ...optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  public warn(message: any, ...optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  public debug?(message: any, ...optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  public verbose?(message: any, ...optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  public fatal?(message: any, ...optionalParams: any[]) {
    console.log(message);

    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
  }

  private buildLogMessage(logLevel: string, message: string, traceId: string): LogMessageType {
    return { time: `${new Date().toISOString()}`, level: LOG_LEVELS[logLevel], traceId, message };
  }

  private writeLog(log: LogMessageType): void {
    const { day, month, year } = this.getCurrentDate();

    const logFilename = `${year}-${month}-${day}-my-bento-log.log`;
    console.log('LOG FILE', logFilename);

    try {
      // -------------
      // 1. Check if already exists a file with the logFilename
      // 1.1 If not exists, create file and write the log message
      // 1.2 If exists, append the log message to the file
      // -------------
      // const currentLogFileData = readFileSync(`./server/log/${logFilename}`, { encoding: 'utf8' });
      // const fullLog = `${currentLogFileData}\n${log}`;
      // writeFileSync(logFilename, `${fullLog}`);
    } catch (err) {
      // If error is file not exists, create file and write the log in the file
      // writeFileSync(`./server/log/${logFilename}`, `${log}`, {
      //   encoding: 'utf8',
      // });
      // console.error('Error writing file:', err);
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
