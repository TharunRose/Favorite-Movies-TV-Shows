import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'movies' })
export class Movie {
    @PrimaryGeneratedColumn('increment')
    id!: number;


    @Column({ type: 'varchar', length: 50 })
    title!: string;


    @Column({ type: 'enum', enum: ['Movie', 'TV Show'], default: 'Movie' })
    type!: 'Movie' | 'TV Show';


    @Column({ type: 'varchar', length: 20, nullable: true })
    director?: string;


    @Column({ type: 'varchar', length: 20, nullable: true })
    budget?: string; // store as string like "$160M" or "3M/ep"


    @Column({ type: 'varchar', length: 20, nullable: true })
    location?: string;


    @Column({ type: 'varchar', length: 15, nullable: true })
    duration?: string; // e.g. "148 min" or "49 min/ep"


    @Column({ type: 'varchar', length: 10, nullable: true })
    yearOrTime?: string; // e.g. "2010" or "2008-2013"


    @Column({ type: 'text', nullable: true })
    details?: string;


    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;


    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}