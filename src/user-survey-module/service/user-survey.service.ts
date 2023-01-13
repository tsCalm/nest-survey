import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/base-service';
import { DeleteResult, Repository } from 'typeorm';
import { UserSurvey } from '../entity/user-survey.entity';
import { SurveyService } from '../../survey-module/survey.service';
import { v4 as uuid } from 'uuid';
import { STATUS_CODES } from 'http';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class UserSurveyService {
  constructor(
    @InjectRepository(UserSurvey)
    private readonly userSurveyRepo: Repository<UserSurvey>,
    private readonly surveyService: SurveyService,
  ) {}

  findOne(id: number) {
    return this.userSurveyRepo.findOne({});
  }
  private userSurveyValidate(entity: UserSurvey) {
    if (entity) {
      throw new ApolloError(
        'You are already participating.',
        STATUS_CODES[400],
        {
          statusCode: 400,
        },
      );
    }
  }
  async create(survey_id: number, user_id: number) {
    const findedSurvey = await this.surveyService.findOne(survey_id);
    // 설문지가 존재하는지 검사
    this.surveyService.findValidate(findedSurvey);
    const userSurveyInput = {
      survey_id,
      user_id,
    };
    // 설문을 참여중인지 참여 완료인지 검사
    const findedUuid = await this.userSurveyRepo.findOne({
      where: userSurveyInput,
    });
    this.userSurveyValidate(findedUuid);
    return await this.userSurveyRepo.save(userSurveyInput);
  }
}
