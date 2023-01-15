import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateQuestionInput, UpdateQuestionInput } from './question.dto';
import { QuestionService } from './question.service';

@Resolver('Question')
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query()
  questionList(@Args('page') page: number, @Args('size') size: number) {
    return this.questionService.findAll(page, size);
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

  @Mutation()
  deleteQuestion(@Args('id') id: number) {
    return this.questionService.delete(id);
  }
}
