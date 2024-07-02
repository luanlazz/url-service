import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Url {
  @Column({ primary: true, type: 'varchar', length: 6 })
  id: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  original_url: string;

  new_url?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  user: string;

  @Column({ type: 'int', default: 0 })
  access_count: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
