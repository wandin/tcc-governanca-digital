import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

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
  @Column({ nullable: true })
  sessaoId!: string | null;
}
