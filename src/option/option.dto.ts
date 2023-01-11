import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@ArgsType()
export class CreateOptionInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  text: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  order: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  question_id: number;
}

@ArgsType()
export class UpdateOptionInput {
  @Field()
  @IsOptional()
  @IsString()
  text: string;

  @Field()
  @IsOptional()
  @IsInt()
  order: number;
}
