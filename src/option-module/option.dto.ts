import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsInt()
  text: string;

  @Field()
  @IsOptional()
  @IsString()
  order: number;
}
