import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SurveyService } from './survey.service';
import { CreateSurveyInput, UpdateSurveyInput } from './survey.dto';

@Resolver('Survey')
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Query()
  surveyList() {
    return this.surveyService.findAll();
  }

  @Query()
  async survey(@Args('id') id: number) {
    const result = await this.surveyService.findOneDetail(id);
    console.log(result);
    return result;
  }

  @Mutation()
  createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ) {
    return this.surveyService.create(createSurveyInput);
  }

  @Mutation()
  updateSurvey(
    @Args('id') id: number,
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ) {
    return this.surveyService.update(id, updateSurveyInput);
  }
}
