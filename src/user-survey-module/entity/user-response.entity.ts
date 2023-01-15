import { SurveyQuestion } from '../../question-module/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/base-entity';
import { UserSurvey } from './user-survey.entity';

@Entity()
export class UserResponse extends BaseEntity {
  @PrimaryColumn()
  survey_id: number;

  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  question_id: number;

  @Column({ type: 'varchar', nullable: false, comment: '유저 응답' })
  user_answer: string;

  @ManyToOne(() => UserSurvey, (survey) => survey.user_responses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'survey_id', referencedColumnName: 'survey_id' },
    { name: 'user_id', referencedColumnName: 'user_id' },
  ])
  user_survey: UserSurvey;

  @ManyToOne(() => SurveyQuestion, (survey) => survey.user_responses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  question: SurveyQuestion;
}
