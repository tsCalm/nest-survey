import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSurveyInput } from '../dto/user-survey.dto';
import { UserSurveyService } from '../service/user-survey.service';

@Resolver('UserSurvey')
export class UserSurveyResolver {
  constructor(private userSurveyService: UserSurveyService) {}

  @Query()
  completedSurveyList() {
    return this.userSurveyService.completedFindAll();
  }

  @Query()
  completedSurvey(@Args('userSurveyInput') userSurveyInput: UserSurveyInput) {
    return this.userSurveyService.completedFindOne(userSurveyInput);
  }

  @Mutation()
  startSurvey(@Args('userSurveyInput') userSurveyInput: UserSurveyInput) {
    return this.userSurveyService.create(userSurveyInput);
  }

  @Mutation()
  completeSurvey(@Args('userSurveyInput') userSurveyInput: UserSurveyInput) {
    return this.userSurveyService.userSurveyComplete(userSurveyInput);
  }
}
