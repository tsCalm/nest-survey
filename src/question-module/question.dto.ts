import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@ArgsType()
export class CreateQuestionInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  order: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  score: number;

  @Field()
  @IsOptional()
  @IsString()
  example: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  survey_id: number;
}

@ArgsType()
export class UpdateQuestionInput {
  @Field()
  @IsOptional()
  @IsString()
  title: string;

  @Field()
  @IsOptional()
  @IsInt()
  order: number;

  @Field()
  @IsOptional()
  @IsInt()
  score: number;

  @Field()
  @IsOptional()
  @IsString()
  example: string;
}
