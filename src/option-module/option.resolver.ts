import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateOptionInput, UpdateOptionInput } from './option.dto';
import { OptionService } from './option.service';

@Resolver('SurveyQuestionOption')
export class OptionResolver {
  constructor(private optionService: OptionService) {}

  @Query()
  optionList() {
    return this.optionService.findAll();
  }

  @Query()
  option(@Args('id') id: number) {
    return this.optionService.findOne(id);
  }

  @Mutation()
  createOption(
    @Args('createOptionInput') createOptionInput: CreateOptionInput,
  ) {
    return this.optionService.create(createOptionInput);
  }

  @Mutation()
  updateOption(
    @Args('id') id: number,
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ) {
    return this.optionService.update(id, updateOptionInput);
  }

  @Mutation()
  deleteOption(@Args('id') id: number) {
    return this.optionService.delete(id);
  }
}
