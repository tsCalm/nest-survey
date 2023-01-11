import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOptionInput, UpdateOptionInput } from './option.dto';
import { SurveyQuestionOption } from './option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(SurveyQuestionOption)
    private readonly optionRepo: Repository<SurveyQuestionOption>,
  ) {}

  create(createOptionInput: CreateOptionInput) {
    const newEntity = this.optionRepo.create(createOptionInput);
    return this.optionRepo.save(newEntity);
  }

  async update(id: number, updateOptionInput: UpdateOptionInput) {
    const findedOption = await this.findOne(id);
    if (!findedOption)
      throw new HttpException('survey not found ', HttpStatus.BAD_REQUEST);
    const updateInput = { ...findedOption, ...updateOptionInput };
    const newEntity = this.optionRepo.create(updateInput);
    return this.optionRepo.save(newEntity);
  }

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
}
