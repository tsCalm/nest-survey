import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base-service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateQuestionInput, UpdateQuestionInput } from './question.dto';
import { SurveyQuestion } from './question.entity';
import { SurveyService } from '../survey-module/survey.service';

@Injectable()
export class QuestionService extends BaseService<SurveyQuestion> {
  constructor(
    @InjectRepository(SurveyQuestion)
    private readonly questionRepo: Repository<SurveyQuestion>,
    private readonly surveyService: SurveyService,
  ) {
    super('question');
  }

  findAll() {
    return this.questionRepo.find();
  }

  findOne(id: number) {
    return this.questionRepo.findOne({
      where: {
        id,
      },
      relations: {
        options: true,
      },
    });
  }

  async create(createQuestionInput: CreateQuestionInput) {
    const findedEntity = await this.surveyService.findOne(
      createQuestionInput.survey_id,
    );
    this.surveyService.findValidate(findedEntity);
    this.surveyService.completeSurveyValidate(findedEntity.is_complete);
    const newEntity = this.questionRepo.create(createQuestionInput);
    return this.questionRepo.save(newEntity);
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const findedEntity = await this.findOne(id);
    const isComplete = await this.surveyService.getIsComplete(
      findedEntity.survey_id,
    );
    this.surveyService.completeSurveyValidate(isComplete);
    this.findValidate(findedEntity);
    const newEntity = this.getNewUpdateEntity(
      findedEntity,
      updateQuestionInput,
    );
    return this.questionRepo.save(newEntity);
  }

  async delete(id: number) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    const isComplete = await this.surveyService.getIsComplete(
      findedEntity.survey_id,
    );
    this.surveyService.completeSurveyValidate(isComplete);
    const result: DeleteResult = await this.questionRepo.delete(id);
    this.DeleteValidate(result);
    return findedEntity;
  }
}
