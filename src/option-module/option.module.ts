import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyService } from '../survey-module/survey.service';
import { Survey } from '../survey-module/survey.entity';
import { SurveyQuestionOption } from './option.entity';
import { OptionResolver } from './option.resolver';
import { OptionService } from './option.service';
import { SurveyQuestion } from '../question-module/question.entity';
import { QuestionService } from '../question-module/question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyQuestionOption, SurveyQuestion, Survey]),
  ],
  providers: [OptionResolver, OptionService, SurveyService, QuestionService],
})
export class OptionModule {}
