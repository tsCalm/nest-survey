import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { SurveyModule } from './survey-module/survey.module';
import { QuestionModule } from './question-module/question.module';
import { OptionModule } from './option-module/option.module';
import { UserSurveyModuleModule } from './user-survey-module/user-survey-module.module';

@Module({
  imports: [
    ConfigModule,
    SurveyModule,
    QuestionModule,
    OptionModule,
    UserSurveyModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
