import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { STATUS_CODES } from 'http';
import { DeleteResult, Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import {
  SaveUserResponseInput,
  UserResponseInput,
} from '../dto/user-response.dto';
import { UserResponse } from '../entity/user-response.entity';
import { UserSurveyService } from './user-survey.service';

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

  findAll(page: number = 1, size: number = 20) {
    return this.userResponseRepo.find({
      skip: (page - 1) * size,
      take: size,
      order: {
        created_at: 'DESC',
      },
    });
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
    const findUserResponse = await this.userResponseRepo.findOne({
      where: {
        survey_id: saveUserResponseInput.survey_id,
        question_id: saveUserResponseInput.question_id,
        user_id: saveUserResponseInput.user_id,
      },
    });
    if (findUserResponse) {
      findUserResponse.user_answer = saveUserResponseInput.user_answer;
      return await this.userResponseRepo.save(findUserResponse);
    }
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
