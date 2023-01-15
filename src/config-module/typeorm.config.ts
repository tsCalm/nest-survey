import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Survey } from '../survey-module/survey.entity';
import { SurveyQuestion } from '../question-module/question.entity';
import { SurveyQuestionOption } from '../option-module/option.entity';
import { UserSurvey } from '../user-survey-module/entity/user-survey.entity';
import { UserResponse } from '../user-survey-module/entity/user-response.entity';
const entities = [
  Survey,
  SurveyQuestion,
  SurveyQuestionOption,
  UserSurvey,
  UserResponse,
];

export default entities;
class TypeOrmConfig {
  static getConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities,
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) =>
    TypeOrmConfig.getConfig(configService),
  inject: [ConfigService],
};
