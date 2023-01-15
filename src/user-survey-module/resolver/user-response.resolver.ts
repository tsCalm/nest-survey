import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  SaveUserResponseInput,
  UserResponseInput,
} from '../dto/user-response.dto';
import { UserResponseService } from '../service/user-response.serivce';

@Resolver('UserResponse')
export class UserResponseResolver {
  constructor(private userResponseService: UserResponseService) {}

  @Query()
  userResponseList(@Args('page') page: number, @Args('size') size: number) {
    return this.userResponseService.findAll(page, size);
  }

  @Query()
  userResponse(findUserResponseInput: UserResponseInput) {
    return this.userResponseService.findOne(findUserResponseInput);
  }

  @Mutation()
  saveUserSelectOption(
    @Args('saveUserResponseInput') saveUserResponseInput: SaveUserResponseInput,
  ) {
    return this.userResponseService.save(saveUserResponseInput);
  }

  @Mutation()
  deleteUserSelectOption(
    @Args('findUserResponseInput') findUserResponseInput: UserResponseInput,
  ) {
    return this.userResponseService.delete(findUserResponseInput);
  }
}
