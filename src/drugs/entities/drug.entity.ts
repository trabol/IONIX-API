import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class Drug {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  approved: boolean;

  @Column({ nullable: false })
  min_dose: number;

  @Column({ nullable: false })
  max_dose: number;
  
  @Column({ nullable: false })
  available_at: Date;
  
}
