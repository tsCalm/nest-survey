import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { SurveyQuestion } from './question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestion])],
  providers: [QuestionService, QuestionResolver],
})
export class QuestionModule {}
