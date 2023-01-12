import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base-service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOptionInput, UpdateOptionInput } from './option.dto';
import { SurveyQuestionOption } from './option.entity';

@Injectable()
export class OptionService extends BaseService<SurveyQuestionOption> {
  constructor(
    @InjectRepository(SurveyQuestionOption)
    private readonly repo: Repository<SurveyQuestionOption>,
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

  create(createOptionInput: CreateOptionInput) {
    const newEntity = this.repo.create(createOptionInput);
    return this.repo.save(newEntity);
  }

  async update(id: number, updateOptionInput: UpdateOptionInput) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    const newEntity = this.getNewUpdateEntity(findedEntity, updateOptionInput);
    return this.repo.save(newEntity);
  }

  async delete(id: number) {
    const findedEntity = await this.findOne(id);
    this.findValidate(findedEntity);
    const result: DeleteResult = await this.repo.delete(id);
    this.DeleteValidate(result);
    return findedEntity;
  }
}
