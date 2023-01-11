import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestionOption } from './option.entity';
import { OptionResolver } from './option.resolver';
import { OptionService } from './option.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestionOption])],
  providers: [OptionResolver, OptionService],
})
export class OptionModule {}
