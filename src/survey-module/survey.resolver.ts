import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateSurveyInput, UpdateSurveyInput } from './survey.dto';
import { SurveyService } from './survey.service';

@Resolver('Survey')
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Query()
  surveyList(@Args('page') page: number, @Args('size') size: number) {
    return this.surveyService.findAll(page, size);
  }

  @Query()
  completeSurveyList(@Args('page') page: number, @Args('size') size: number) {
    return this.surveyService.findAllCompleteSurvey(page, size);
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
  completeSurvey(@Args('id') id: number) {
    return this.surveyService.completeSurvey(id);
  }

  @Mutation()
  deleteSurvey(@Args('id') id: number) {
    return this.surveyService.delete(id);
  }
}
