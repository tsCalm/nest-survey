import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
export class UserSurveyInput {
  @Field()
  @IsNotEmpty()
  @IsInt()
  survey_id: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  user_id: number;
}
