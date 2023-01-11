import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateSurveyInput, UpdateSurveyInput } from './survey.dto';
import { Survey } from './survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepo: Repository<Survey>,
  ) {}

  create(createSurveyInput: CreateSurveyInput) {
    const newEntity = this.surveyRepo.create(createSurveyInput);
    return this.surveyRepo.save(newEntity);
  }

  async update(id: number, updateSurveyInput: UpdateSurveyInput) {
    const findedSurvey = await this.findOne(id);
    if (!findedSurvey)
      throw new HttpException('survey not found ', HttpStatus.BAD_REQUEST);
    const updateInput = { ...findedSurvey, ...updateSurveyInput };
    const newEntity = this.surveyRepo.create(updateInput);
    return this.surveyRepo.save(newEntity);
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

  findOneDetail(id: number) {
    return this.surveyRepo.findOne({
      where: {
        id,
      },
      relations: ['questions', 'questions.options'],
    });
  }
  async delete(id: number) {
    const findedEntity = await this.findOne(id);
    if (!findedEntity)
      throw new HttpException('survey not found ', HttpStatus.BAD_REQUEST);
    const result: DeleteResult = await this.surveyRepo.delete(id);
    if (result.affected < 1)
      throw new HttpException(
        'survey delete failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return findedEntity;
  }
}
