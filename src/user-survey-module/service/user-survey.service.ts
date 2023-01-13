import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/base-service';
import { DeleteResult, Repository } from 'typeorm';
import { UserSurvey } from '../entity/user-survey.entity';
import { SurveyService } from '../../survey-module/survey.service';
import { STATUS_CODES } from 'http';
import { ApolloError } from 'apollo-server-express';
import { UserSurveyInput } from '../dto/user-survey.dto';

@Injectable()
export class UserSurveyService {
  constructor(
    @InjectRepository(UserSurvey)
    private readonly userSurveyRepo: Repository<UserSurvey>,
    private readonly surveyService: SurveyService,
  ) {}

  completedFindAll() {
    return this.userSurveyRepo.find({
      select: ['survey', 'user_responses'],
      where: {
        is_complete: true,
      },
      relations: ['survey', 'user_responses', 'user_responses.question'],
    });
  }

  async completedFindOne(userSurveyInput: UserSurveyInput) {
    const result = await this.userSurveyRepo.findOne({
      select: ['survey', 'user_responses'],
      where: userSurveyInput,
      relations: [
        'survey',
        'user_responses',
        'user_responses.question',
        'user_responses.question.options',
      ],
    });
    // const temp = result.user_responses
    //   .map((obj) => obj.question.options)
    //   .flat();
    console.log('result : ', result);
    return result;
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
  async create(userSurveyInput: UserSurveyInput) {
    const { survey_id, user_id } = userSurveyInput;
    const findedSurvey = await this.surveyService.findOne(survey_id);
    // 설문지가 존재하는지 검사
    this.surveyService.findValidate(findedSurvey);
    // 설문을 참여중인지 참여 완료인지 검사
    const findedEntity = await this.userSurveyRepo.findOne({
      where: userSurveyInput,
    });
    this.userSurveyValidate(findedEntity);
    return await this.userSurveyRepo.save(userSurveyInput);
  }

  async userSurveyComplete(userSurveyInput: UserSurveyInput) {
    const { survey_id } = userSurveyInput;
    const findedSurvey = await this.surveyService.findOne(survey_id);
    this.surveyService.findValidate(findedSurvey);
    const findedEntity = await this.userSurveyRepo.findOne({
      where: userSurveyInput,
    });
    if (findedEntity.is_complete) {
      throw new ApolloError(
        'already completed user survey.',
        STATUS_CODES[400],
        {
          statusCode: 400,
        },
      );
    }
    findedEntity.is_complete = true;
    return await this.userSurveyRepo.save(findedEntity);
  }
}
