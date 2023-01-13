import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserResponseService } from '../service/user-response.serivce';

@Resolver('UserResponse')
export class UserResponseResolver {
  constructor(private userSurveyService: UserResponseService) {}

  // @Query()
  // surveyList() {
  //   return this.userSurveyService.findAll();
  // }

  @Mutation()
  saveUserSelectOption(
    @Args('survey_id') survey_id: number,
    @Args('question_id') question_id: number,
    @Args('user_id') user_id: number,
    @Args('user_answer') user_answer: string,
  ) {
    // return this.userSurveyService.save(survey_id, user_id);
  }
}
