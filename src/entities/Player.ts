import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('players')
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'text', nullable: false })
    username!: string

    @Column({ type: 'text', nullable: false })
    role!: string

    @Column({ type: 'text', default: 0 })
    experience!: number
}