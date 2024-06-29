import { Injectable, LogLevel, LoggerService } from '@nestjs/common';

const LOG_LEVELS: Record<string, string> = {
  Log: 'LOG',
  Error: 'ERROR',
  Warn: 'WARN',
  Debug: 'DEBUG',
  Verbose: 'VERBOSE',
  Fatal: 'FATAL',
};

type LogType = {
  time: string;
  level: string;
  message: string;
  traceId: string;
};

@Injectable()
export class MyBentoLogger implements LoggerService {
  public log(message: any, ...optionalParams: any[]) {
    console.log(message);

    const traceId: string = optionalParams[0];

    const logMessage = this.buildLogMessage('Log', message, traceId);
    // WRITE LOG IN FILE

    // throw new Error('Method not implemented.');
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

  //   setLogLevels?(levels: LogLevel[]) {
  //     throw new Error('Method not implemented.');
  //   }

  private buildLogMessage(logLevel: string, message: string, traceId: string): LogType {
    return { time: `${new Date()}`, level: LOG_LEVELS[logLevel], message, traceId };
  }
}
