import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export class ColumnNumberTransformer {
    to(data: number): number {
        return data;
    }

    from(data: string): number {
        return parseInt(data)
    }
}

@Entity('players')
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'text', nullable: false })
    username!: string

    @Column({ type: 'text', nullable: false })
    role!: string

    @Column({ type: 'int8', default: 0, transformer: new ColumnNumberTransformer() })
    experience!: number
}