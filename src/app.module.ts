import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config-module';
import { SurveyModule } from './survey-module/survey.module';
import { QuestionModule } from './question-module/question.module';
import { OptionModule } from './option-module/option.module';
import { UserSurveyModule } from './user-survey-module/user-survey.module';

@Module({
  imports: [
    ConfigModule,
    SurveyModule,
    QuestionModule,
    OptionModule,
    UserSurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
