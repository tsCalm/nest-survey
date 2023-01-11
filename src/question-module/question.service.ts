import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateQuestionInput, UpdateQuestionInput } from './question.dto';
import { SurveyQuestion } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(SurveyQuestion)
    private readonly questionRepo: Repository<SurveyQuestion>,
  ) {}

  create(createQuestionInput: CreateQuestionInput) {
    const newEntity = this.questionRepo.create(createQuestionInput);
    return this.questionRepo.save(newEntity);
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const findedOption = await this.findOne(id);
    if (!findedOption)
      throw new HttpException('survey not found ', HttpStatus.BAD_REQUEST);
    const updateInput = { ...findedOption, ...updateQuestionInput };
    const newEntity = this.questionRepo.create(updateInput);
    return this.questionRepo.save(newEntity);
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
  async delete(id: number) {
    const findedOption = await this.findOne(id);
    if (!findedOption)
      throw new HttpException('question not found ', HttpStatus.BAD_REQUEST);
    const result: DeleteResult = await this.questionRepo.delete(id);
    if (result.affected < 1)
      throw new HttpException(
        'question delete failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return findedOption;
  }
}
