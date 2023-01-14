import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { SurveyQuestion } from '../question-module/question.entity';
import { UserSurvey } from '../user-survey-module/entity/user-survey.entity';

@Entity()
export class Survey extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '설문에 응해주셔서 감사합니다.',
  })
  goodbye_message: string;

  @Column({ type: 'int', default: 0 })
  total_score: number;

  @Column({ type: 'boolean', default: false })
  is_complete: boolean;

  @Column({ type: 'text', nullable: false })
  description: string;

  @OneToMany(() => SurveyQuestion, (question) => question.survey)
  questions: SurveyQuestion[];

  @OneToMany(() => UserSurvey, (userSurvey) => userSurvey.survey)
  user_survey: UserSurvey[];
}
