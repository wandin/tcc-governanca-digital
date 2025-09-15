import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  entidade!: string; // 'Voto' | 'Proposta' | 'Sessao'

  @Column()
  acao!: string; // 'CRIAR' | 'ENCERRAR' | 'REGISTRAR_VOTO'

  @Column()
  dadosHash!: string;

  @CreateDateColumn()
  timestamp!: Date;

  @Column({ nullable: true })
  txBlockchainId!: string | null;
}
