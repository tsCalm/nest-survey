import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../common/base-entity';

@Entity()
export class SurveyQuestionOption extends BaseEntity {
  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'smallint' })
  order: number;

  @Column()
  question_id: number;
}
