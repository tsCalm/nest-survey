import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base-service';
import { DeleteResult, Repository } from 'typeorm';
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

  findAll() {
    return this.surveyRepo.find();
  }

  findOne(id: number) {
    return this.surveyRepo.findOne({
      where: {
        id,
      },
    });
  }

  create(createSurveyInput: CreateSurveyInput) {
    const newEntity = this.surveyRepo.create(createSurveyInput);
    return this.surveyRepo.save(newEntity);
  }

  async update(id: number, updateSurveyInput: UpdateSurveyInput) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    const newEntity = this.getNewUpdateEntity(findedEntity, updateSurveyInput);
    return this.surveyRepo.save(newEntity);
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

  async delete(id: number) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    const result: DeleteResult = await this.surveyRepo.delete(id);
    this.DeleteValidate(result);
    return findedEntity;
  }
}
