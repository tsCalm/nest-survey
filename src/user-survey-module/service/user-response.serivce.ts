import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/base-service';
import { DeleteResult, Repository } from 'typeorm';
import { UserSurvey } from '../entity/user-survey.entity';
import { SurveyService } from '../../survey-module/survey.service';
import { STATUS_CODES } from 'http';
import { ApolloError } from 'apollo-server-express';
import { UserResponse } from '../entity/user-response.entity';
import {
  SaveUserResponseInput,
  UserResponseInput,
} from '../dto/user-response.dto';

@Injectable()
export class UserResponseService {
  constructor(
    @InjectRepository(UserResponse)
    private readonly userResponseRepo: Repository<UserResponse>, // private readonly surveyService: SurveyService,
  ) {}

  findAll() {
    return this.userResponseRepo.find({});
  }

  findOne(findUserResponseInput: UserResponseInput) {
    return this.userResponseRepo.findOne({
      where: findUserResponseInput,
    });
  }

  async save(saveUserResponseInput: SaveUserResponseInput) {
    console.log('saveUserResponseInput : ', saveUserResponseInput);
    const instance = this.userResponseRepo.create(saveUserResponseInput);
    return await this.userResponseRepo.save(instance);
  }

  delete(findUserResponseInput: UserResponseInput) {
    return this.userResponseRepo.delete(findUserResponseInput);
  }
}
