import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../common/base-entity';
/**
 * 설문지 엔티티
  1. title (varchar)
  2. sub_title (varchar)
  3. Description (TEXT)
 */
@Entity()
export class Survey extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  sub_title: string;

  @Column({ type: 'text', nullable: false })
  description: string;
}
