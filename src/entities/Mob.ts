import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export class ColumnNumberTransformer {
    to(data: number): number {
        return data;
    }

    from(data: string): number {
        return parseInt(data)
    }
}

@Entity('mobs')
export class Mob extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'text', nullable: false })
    name!: string

    @Column({ type: 'text', nullable: false })
    classification!: string

    @Column({ type: 'int8', nullable: false, transformer: new ColumnNumberTransformer() })
    experience!: number
}