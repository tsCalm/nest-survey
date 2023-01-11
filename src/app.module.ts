import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';

@Module({
  imports: [ConfigModule, SurveyModule, QuestionModule, OptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
