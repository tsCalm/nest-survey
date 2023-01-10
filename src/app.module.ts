import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [ConfigModule, SurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
