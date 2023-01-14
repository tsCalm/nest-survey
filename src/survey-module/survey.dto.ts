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
  goodbye_message: string;

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
  goodbye_message: string;

  @Field()
  @IsOptional()
  @IsString()
  description: string;
}
