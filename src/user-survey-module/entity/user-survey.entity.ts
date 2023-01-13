import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
@Entity()
export class UserSurvey {
  @PrimaryColumn()
  survey_id: number;

  @PrimaryColumn({ type: 'int', primary: true })
  user_id: number;

  @Column({ type: 'boolean', default: false })
  isComplete: boolean;
}
