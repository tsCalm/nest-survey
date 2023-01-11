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

@Entity()
export class SurveyQuestion extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'smallint' })
  order: number;

  @Column({ type: 'smallint' })
  score: number;

  @Column({ type: 'text', default: null })
  example: string;

  @Column()
  @Index()
  survey_id: number;

  @Column({ type: 'boolean', default: false })
  is_multiple_answer: boolean;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn({ name: 'survey_id', referencedColumnName: 'id' })
  survey: Survey;

  @OneToMany(() => SurveyQuestionOption, (opt) => opt.question)
  options: SurveyQuestionOption[];
}
