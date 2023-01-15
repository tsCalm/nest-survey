import { Survey } from '../survey-module/survey.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { SurveyQuestionOption } from '../option-module/option.entity';
import { UserResponse } from '../user-survey-module/entity/user-response.entity';

@Entity()
export class SurveyQuestion extends BaseEntity {
  @Column({ type: 'varchar', comment: '문항 이름' })
  title: string;

  @Column({ type: 'smallint', comment: '문항 순서' })
  order: number;

  @Column({ type: 'smallint', comment: '문항 점수' })
  score: number;

  @Column({ type: 'text', default: null, comment: '문항 예시' })
  example: string;

  @Column({ type: 'int', nullable: false })
  @Index()
  survey_id: number;

  @Column({ type: 'boolean', default: false, comment: '중복 응답 여부' })
  is_multiple_answer: boolean;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_id', referencedColumnName: 'id' })
  survey: Survey;

  @OneToMany(() => SurveyQuestionOption, (opt) => opt.question)
  options: SurveyQuestionOption[];

  @OneToMany(() => UserResponse, (userResponse) => userResponse.question)
  user_responses: UserResponse[];
}
