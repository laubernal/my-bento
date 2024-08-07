import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { readdirSync, rmSync } from 'fs';

@Injectable()
export class Delete30DaysOldLogFilesService {
  private logDirectoryPath = '/app/log/';
  @Cron('0 0 * * *')
  //   @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    const logDirectoryFiles = readdirSync(this.logDirectoryPath);
    // const logDirectoryFiles = [
    //   '20240727-my-bento-log.log',
    //   '20240728-my-bento-log.log',
    //   '20240729-my-bento-log.log',
    //   '20240730-my-bento-log.log',
    //   '20240731-my-bento-log.log',
    // ];

    const filtered30DaysOldLogFiles = this.filterOldLogFiles(logDirectoryFiles);

    if (filtered30DaysOldLogFiles.length) {
      this.deleteFiles(filtered30DaysOldLogFiles);
    }
  }

  private filterOldLogFiles(files: string[]): string[] {
    const today = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysOld = 30;

    return files.filter(file => {
      const match = file.match(/^(\d{8})-my-bento-log\.log$/);

      if (match) {
        const logFileDate = match[1];
        const year = parseInt(logFileDate.substring(0, 4), 10);
        const month = parseInt(logFileDate.substring(4, 6), 10) - 1;
        const day = parseInt(logFileDate.substring(6, 8), 10);

        const fileDate = new Date(year, month, day);
        const timeDifference = today.getTime() - fileDate.getTime();
        const daysDifference = timeDifference / millisecondsPerDay;

        return daysDifference >= daysOld;
      }

      return false;
    });
  }

  private deleteFiles(filePaths: string[]) {
    filePaths.forEach((filePath: string) => {
      rmSync(`${this.logDirectoryPath}${filePath}`);
    });
  }
}
