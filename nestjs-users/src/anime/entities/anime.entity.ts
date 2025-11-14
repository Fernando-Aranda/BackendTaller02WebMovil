import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  synopsis: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  episodes: number;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  year: number;
}
