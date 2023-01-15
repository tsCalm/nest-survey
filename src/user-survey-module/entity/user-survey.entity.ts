import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Survey } from '../../survey-module/survey.entity';
import { UserResponse } from './user-response.entity';

@Entity()
export class UserSurvey {
  @PrimaryColumn({ comment: '작성 완료된 설문지 아이디' })
  survey_id: number;

  @PrimaryColumn({ type: 'int', comment: '유저 아이디' })
  user_id: number;

  @Column({ type: 'int', default: 0, comment: '응답 설문지 총점' })
  user_total_score: number;

  @Column({
    type: 'boolean',
    default: false,
    comment: '유저 설문 응답 완료 여부',
  })
  is_complete: boolean;

  @ManyToOne(() => Survey, (survey) => survey.user_survey, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_id', referencedColumnName: 'id' })
  survey: Survey;

  @OneToMany(() => UserResponse, (userResponse) => userResponse.user_survey)
  user_responses: UserResponse[];
}
