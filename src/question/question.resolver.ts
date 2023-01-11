import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { QuestionService } from './question.service';
import { CreateQuestionInput, UpdateQuestionInput } from './question.dto';

@Resolver('Question')
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query()
  questionList() {
    return this.questionService.findAll();
  }

  @Query()
  question(@Args('id') id: number) {
    return this.questionService.findOne(id);
  }

  @Mutation()
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Mutation()
  updateQuestion(
    @Args('id') id: number,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionService.update(id, updateQuestionInput);
  }
}
