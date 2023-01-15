import { ConsoleLogger, Logger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: string, trace: string) {
    console.log('message : ', message);
    console.log('message : ', trace);
    super.error(message, trace);
  }

  warn(message: string, trace: string) {
    console.log('message : ', message);
    console.log('message : ', trace);
    super.error(message, trace);
  }
}
