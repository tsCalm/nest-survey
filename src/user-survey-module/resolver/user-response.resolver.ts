import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  UserResponseInput,
  SaveUserResponseInput,
} from '../dto/user-response.dto';
import { UserResponseService } from '../service/user-response.serivce';

@Resolver('UserResponse')
export class UserResponseResolver {
  constructor(private userResponseService: UserResponseService) {}

  @Query()
  userResponseList() {
    return this.userResponseService.findAll();
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
