import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proposal } from './Proposal.js';

export enum EscolhaVoto {
  SIM = 'SIM',
  NAO = 'NAO',
  ABSTENCAO = 'ABSTENCAO',
}

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  propostaId!: string;

  @ManyToOne(() => Proposal, (proposal) => proposal.id, { onDelete: 'CASCADE' })
  proposta!: Proposal;

  @Column()
  hashEleitor!: string;

  @Column({
    type: 'enum',
    enum: EscolhaVoto,
  })
  escolha!: EscolhaVoto;

  @Column({ type: 'varchar', length: 255, nullable: true })
  txBlockchainId!: string | null;
}
