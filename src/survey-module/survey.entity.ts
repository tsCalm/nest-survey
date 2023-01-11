import { SurveyQuestion } from '../question-module/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../common/base-entity';

@Entity()
export class Survey extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  sub_title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @OneToMany(() => SurveyQuestion, (question) => question.survey)
  questions: SurveyQuestion[];
}
