import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSurveyInput } from '../dto/user-survey.dto';
import { UserSurveyService } from '../service/user-survey.service';

@Resolver('UserSurvey')
export class UserSurveyResolver {
  constructor(private userSurveyService: UserSurveyService) {}

  @Query()
  completedSurveyList(@Args('page') page: number, @Args('size') size: number) {
    return this.userSurveyService.completedFindAll(page, size);
  }

  @Query()
  completedSurvey(@Args('userSurveyInput') userSurveyInput: UserSurveyInput) {
    return this.userSurveyService.completedFindOne(userSurveyInput);
  }

  @Mutation()
  startUserSurvey(@Args('userSurveyInput') userSurveyInput: UserSurveyInput) {
    return this.userSurveyService.create(userSurveyInput);
  }

  @Mutation()
  completeUserSurvey(
    @Args('userSurveyInput') userSurveyInput: UserSurveyInput,
  ) {
    return this.userSurveyService.userSurveyComplete(userSurveyInput);
  }
}
