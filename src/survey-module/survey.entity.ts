import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { SurveyQuestion } from '../question-module/question.entity';
import { UserSurvey } from '../user-survey-module/entity/user-survey.entity';

@Entity()
export class Survey extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, comment: '설문지 이름' })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '설문에 응해주셔서 감사합니다.',
    comment: '설문지 완료 메시지',
  })
  goodbye_message: string;

  @Column({ type: 'int', default: 0, comment: '설문지 총점' })
  total_score: number;

  @Column({ type: 'boolean', default: false, comment: '설문지 생성 완료 여부' })
  is_complete: boolean;

  @Column({ type: 'text', nullable: false, comment: '설문지 설명' })
  description: string;

  @OneToMany(() => SurveyQuestion, (question) => question.survey)
  questions: SurveyQuestion[];

  @OneToMany(() => UserSurvey, (userSurvey) => userSurvey.survey)
  user_survey: UserSurvey[];
}
