import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';

@Entity()
export class UserSurvey extends BaseEntity {
  @Column()
  survey_id: number;

  @Column({ type: 'varchar', nullable: false })
  ip: string;

  @Column({ type: 'boolean', default: false })
  isComplete: boolean;
}
