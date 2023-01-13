import { SurveyQuestion } from '../question-module/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../common/base-entity';

@Entity()
export class SurveyQuestionOption extends BaseEntity {
  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'smallint' })
  order: number;

  @Column({ type: 'int', nullable: false })
  @Index()
  question_id: number;

  @ManyToOne(() => SurveyQuestion, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: SurveyQuestion;
}
