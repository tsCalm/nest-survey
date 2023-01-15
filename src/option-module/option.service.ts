import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionService } from '../question-module/question.service';
import { DeleteResult, Repository } from 'typeorm';
import { BaseService } from '../common/base-service';
import { SurveyService } from '../survey-module/survey.service';
import { CreateOptionInput, UpdateOptionInput } from './option.dto';
import { SurveyQuestionOption } from './option.entity';

@Injectable()
export class OptionService extends BaseService<SurveyQuestionOption> {
  constructor(
    @InjectRepository(SurveyQuestionOption)
    private readonly repo: Repository<SurveyQuestionOption>,
    private readonly questionService: QuestionService,
    private readonly surveyService: SurveyService,
  ) {
    super('option');
  }

  findAll(): Promise<SurveyQuestionOption[]> {
    return this.repo.find();
  }

  async findOne(id: number) {
    const findedEntity = await this.repo.findOne({
      where: {
        id,
      },
    });
    this.findValidate(findedEntity);
    return findedEntity;
  }

  async create(createOptionInput: CreateOptionInput) {
    const findedQuestion = await this.questionService.findOne(
      createOptionInput.question_id,
    );
    this.questionService.findValidate(findedQuestion);
    const isComplete = await this.surveyService.getIsComplete(
      findedQuestion.survey_id,
    );
    this.surveyService.completeSurveyValidate(isComplete);
    const newEntity = this.repo.create(createOptionInput);
    return await this.repo.save(newEntity);
  }

  async update(id: number, updateOptionInput: UpdateOptionInput) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    const findedQuestion = await this.questionService.findOne(
      findedEntity.question_id,
    );
    this.questionService.findValidate(findedQuestion);
    const isComplete = await this.surveyService.getIsComplete(
      findedQuestion.survey_id,
    );
    this.surveyService.completeSurveyValidate(isComplete);
    const newEntity = this.getNewUpdateEntity(findedEntity, updateOptionInput);
    return this.repo.save(newEntity);
  }

  async delete(id: number) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    const findedQuestion = await this.questionService.findOne(
      findedEntity.question_id,
    );
    this.questionService.findValidate(findedQuestion);
    const isComplete = await this.surveyService.getIsComplete(
      findedQuestion.survey_id,
    );
    this.surveyService.completeSurveyValidate(isComplete);
    const result: DeleteResult = await this.repo.delete(id);
    this.DeleteValidate(result);
    return findedEntity;
  }
}
