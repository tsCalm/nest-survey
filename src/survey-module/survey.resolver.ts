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
  survey(@Args('id') id: number) {
    return this.surveyService.findOneDetail(id);
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

  @Mutation()
  deleteSurvey(@Args('id') id: number) {
    return this.surveyService.delete(id);
  }

  @Mutation()
  completeSurvey(@Args('id') id: number) {
    return this.surveyService.completeSurvey(id);
  }
}
