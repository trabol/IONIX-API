import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Drug } from '../../drugs/entities/drug.entity';

@Entity()
export class Vaccination {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  dose: number

  @Column({ nullable: false })
  date: Date;

  @ManyToOne(() => Drug, drug => drug.vaccinations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drug_id' })
  drug:Drug
  @Column()
  drug_id: number

}
