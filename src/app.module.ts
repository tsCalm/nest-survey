import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [ConfigModule, SurveyModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
