import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  titulo!: string;

  @Column({ type: 'text' })
  descricao!: string;

  @CreateDateColumn()
  criadaEm!: Date;

  // Sessão de votação mínima: representada por string (id) para simplificar.
  @Column({ type: 'varchar', length: 255, nullable: true })
  sessaoId!: string | null;
}
