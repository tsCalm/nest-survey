import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';

@Entity()
export class UserResponse extends BaseEntity {
  @Column()
  user_survey_id: number;

  @Column()
  question_id: number;

  @Column({ type: 'varchar', nullable: false })
  user_answer: string;
}
