import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class SaveUserResponseInput {
  @Field()
  @IsNotEmpty()
  @IsInt()
  survey_id: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  question_id: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  user_answer: string;
}

@ArgsType()
export class UserResponseInput {
  @Field()
  @IsNotEmpty()
  @IsInt()
  survey_id: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  question_id: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  user_id: number;
}
