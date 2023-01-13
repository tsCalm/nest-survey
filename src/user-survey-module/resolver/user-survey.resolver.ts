import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SaveUserSurveyInput } from '../dto/user-survey.dto';
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
    @Args('saveUserSurveyInput') saveUserSurveyInput: SaveUserSurveyInput,
  ) {
    return this.userSurveyService.create(saveUserSurveyInput);
  }

  @Mutation()
  completeSurvey(
    @Args('saveUserSurveyInput') saveUserSurveyInput: SaveUserSurveyInput,
  ) {
    return this.userSurveyService.userSurveyComplete(saveUserSurveyInput);
  }
}
