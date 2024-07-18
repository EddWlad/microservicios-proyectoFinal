import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./user.model"

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    rol_code!: string

    @Column({unique:true})
    rol_name!: string

    @Column()
    rol_description!: string

    @Column()
    rol_status!: boolean

    @ManyToOne(() => User, (user) => user.use_code)
    @JoinColumn({ name: 'rol_creator_user' })
    rol_creator_user!: User

}