import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/base-entity';
import { Survey } from '../../survey-module/survey.entity';
import { UserResponse } from './user-response.entity';

@Entity()
export class UserSurvey {
  @PrimaryColumn()
  survey_id: number;

  @PrimaryColumn({ type: 'int' })
  user_id: number;

  @Column({ type: 'boolean', default: false })
  is_complete: boolean;

  @ManyToOne(() => Survey, (survey) => survey.user_survey, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_id', referencedColumnName: 'id' })
  survey: Survey;

  @OneToMany(() => UserResponse, (userResponse) => userResponse.user_survey)
  user_responses: UserResponse[];
}
