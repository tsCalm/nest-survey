import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class CreateSurveyInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  sub_title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;
}

@ArgsType()
export class UpdateSurveyInput {
  @Field()
  @IsOptional()
  @IsString()
  title: string;

  @Field()
  @IsOptional()
  @IsString()
  sub_title: string;

  @Field()
  @IsOptional()
  @IsString()
  description: string;
}
