import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Proposal } from './Proposal.js';

export type EscolhaVoto = 'SIM' | 'NAO' | 'ABSTENCAO';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Proposal, { nullable: false })
  @JoinColumn({ name: 'propostaId' })
  proposta!: Proposal;

  @Column()
  propostaId!: string;

  @Column()
  hashEleitor!: string; // anonimização

  @Column({ type: 'varchar' })
  escolha!: EscolhaVoto;

  @CreateDateColumn()
  timestamp!: Date;

  @Column({ nullable: true })
  txBlockchainId!: string | null;
}
