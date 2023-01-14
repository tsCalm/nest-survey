import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { SurveyQuestion } from './question.entity';
import { SurveyService } from '../survey-module/survey.service';
import { Survey } from '../survey-module/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestion, Survey])],
  providers: [QuestionService, QuestionResolver, SurveyService],
  exports: [QuestionService],
})
export class QuestionModule {}
