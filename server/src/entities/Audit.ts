import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  entidade!: string;

  @Column()
  acao!: string;

  @Column({ type: 'text' })
  dadosHash!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  txBlockchainId!: string | null;

  @CreateDateColumn()
  criadoEm!: Date;
}
