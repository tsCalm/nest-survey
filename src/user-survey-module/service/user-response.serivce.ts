import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/base-service';
import { DeleteResult, Repository } from 'typeorm';
import { UserSurvey } from '../entity/user-survey.entity';
import { STATUS_CODES } from 'http';
import { ApolloError } from 'apollo-server-express';
import { UserResponse } from '../entity/user-response.entity';
import {
  SaveUserResponseInput,
  UserResponseInput,
} from '../dto/user-response.dto';
import { UserSurveyService } from './user-survey.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class UserResponseService extends BaseService<UserResponse> {
  constructor(
    @InjectRepository(UserResponse)
    private readonly userResponseRepo: Repository<UserResponse>,
    private readonly userSurveyService: UserSurveyService,
  ) {
    super('userResponse');
  }

  completeValidate(isComplete: boolean) {
    if (isComplete) {
      throw new ApolloError('Completed survey', STATUS_CODES[400], {
        statusCode: 400,
      });
    }
  }

  private async getIsComplete(survey_id: number, user_id: number) {
    return await this.userSurveyService.isComplete(survey_id, user_id);
  }

  findAll() {
    return this.userResponseRepo.find({});
  }

  async findOne(findUserResponseInput: UserResponseInput) {
    const findedResponse = await this.userResponseRepo.findOne({
      where: findUserResponseInput,
    });
    this.findValidate(findedResponse);
    return findedResponse;
  }

  async save(saveUserResponseInput: SaveUserResponseInput) {
    const isComplete = await this.getIsComplete(
      saveUserResponseInput.survey_id,
      saveUserResponseInput.user_id,
    );
    this.completeValidate(isComplete);
    const instance = this.userResponseRepo.create(saveUserResponseInput);
    return await this.userResponseRepo.save(instance);
  }

  async delete(findUserResponseInput: UserResponseInput) {
    const findedResponse = await this.findOne(findUserResponseInput);
    this.findValidate(findedResponse);
    const isComplete = await this.getIsComplete(
      findUserResponseInput.survey_id,
      findUserResponseInput.user_id,
    );
    this.completeValidate(isComplete);
    const deleteResult: DeleteResult = await this.userResponseRepo.delete(
      findUserResponseInput,
    );
    this.DeleteValidate(deleteResult);
    return findedResponse;
  }
}
