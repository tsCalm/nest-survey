import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOptionInput, UpdateOptionInput } from './option.dto';
import { SurveyQuestionOption } from './option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(SurveyQuestionOption)
    private readonly optionRepo: Repository<SurveyQuestionOption>,
  ) {}

  findAll() {
    return this.optionRepo.find();
  }

  findOne(id: number) {
    return this.optionRepo.findOne({
      where: {
        id,
      },
    });
  }

  create(createOptionInput: CreateOptionInput) {
    const newEntity = this.optionRepo.create(createOptionInput);
    return this.optionRepo.save(newEntity);
  }

  async update(id: number, updateOptionInput: UpdateOptionInput) {
    const findedOption = await this.findOne(id);
    if (!findedOption)
      throw new HttpException('option not found ', HttpStatus.BAD_REQUEST);
    const updateInput = { ...findedOption, ...updateOptionInput };
    const newEntity = this.optionRepo.create(updateInput);
    return this.optionRepo.save(newEntity);
  }

  async delete(id: number) {
    const findedOption = await this.findOne(id);
    if (!findedOption)
      throw new HttpException('option not found ', HttpStatus.BAD_REQUEST);
    const result: DeleteResult = await this.optionRepo.delete(id);
    if (result.affected < 1)
      throw new HttpException(
        'option delete failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return findedOption;
  }
}
