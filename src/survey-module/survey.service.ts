import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { STATUS_CODES } from 'http';
import { DeleteResult, Repository } from 'typeorm';
import { BaseService } from '../common/base-service';
import { CreateSurveyInput, UpdateSurveyInput } from './survey.dto';
import { Survey } from './survey.entity';

@Injectable()
export class SurveyService extends BaseService<Survey> {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepo: Repository<Survey>,
  ) {
    super('survey');
  }
  async calcTotalScore(survey_id: number) {
    const { questions } = await this.surveyRepo.findOne({
      select: ['questions'],
      where: {
        id: survey_id,
      },
      relations: ['questions'],
    });

    if (!questions) return 0;

    return questions.map((obj) => obj.score).reduce((acc, cur) => acc + cur, 0);
  }
  async getIsComplete(id: number) {
    const { is_complete } = await this.surveyRepo.findOne({
      select: ['is_complete'],
      where: {
        id,
      },
    });
    return is_complete;
  }
  completeSurveyValidate(is_complete: boolean) {
    if (is_complete)
      throw new ApolloError(`Completed user survey.`, STATUS_CODES[400], {
        statusCode: 400,
      });
  }
  findAll() {
    return this.surveyRepo.find();
  }
  findAllCompleteSurvey() {
    return this.surveyRepo.find({
      where: {
        is_complete: true,
      },
    });
  }
  findOne(id: number) {
    return this.surveyRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findOneDetail(id: number): Promise<Survey> {
    const findedEntity = await this.surveyRepo.findOne({
      where: {
        id,
      },
      relations: ['questions', 'questions.options'],
    });
    this.findValidate(findedEntity);
    return findedEntity;
  }

  create(createSurveyInput: CreateSurveyInput) {
    const newEntity = this.surveyRepo.create(createSurveyInput);
    return this.surveyRepo.save(newEntity);
  }

  async update(id: number, updateSurveyInput: UpdateSurveyInput) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    this.completeSurveyValidate(findedEntity.is_complete);
    const newEntity = this.getNewUpdateEntity(findedEntity, updateSurveyInput);
    return await this.surveyRepo.save(newEntity);
  }

  async completeSurvey(id: number) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    findedEntity.is_complete = true;
    const totalScore = await this.calcTotalScore(id);
    findedEntity.total_score = totalScore;
    return await this.surveyRepo.save(findedEntity);
  }
  async delete(id: number) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    const result: DeleteResult = await this.surveyRepo.delete(id);
    this.DeleteValidate(result);
    return findedEntity;
  }
}
