import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSurveyService } from '../service/user-survey.service';

@Resolver('UserSurvey')
export class UserSurveyResolver {
  constructor(private userSurveyService: UserSurveyService) {}

  // @Query()
  // surveyList() {
  //   return this.userSurveyService.findAll();
  // }

  @Mutation()
  startSurvey(
    @Args('survey_id') survey_id: number,
    @Args('user_id') user_id: number,
  ) {
    return this.userSurveyService.create(survey_id, user_id);
  }

  @Mutation()
  completeSurvey(
    @Args('survey_id') survey_id: number,
    @Args('user_id') user_id: string,
  ) {
    return true;
    // return this.userSurveyService.update(id, updateSurveyInput);
  }
}
