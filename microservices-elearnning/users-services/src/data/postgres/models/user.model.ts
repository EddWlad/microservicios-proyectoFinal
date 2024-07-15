import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Role } from "./role.model"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    use_code!: string

    @Column()
    use_name!: string

    @Column()
    use_lastname!: string

    @Column({unique:true})
    use_nui!: string

    @Column({unique:true})
    use_email!: string

    @Column({default:false})
    use_emailValidated!: boolean

    @Column()
    use_password!: string

    @Column({ nullable: true })
    use_phone!: string

    @Column({ nullable: true })
    use_address!: string

    @Column({ nullable: true })
    use_img!: string

    @Column({default:1})
    use_status!: number

    @ManyToOne(() => Role, (role) => role.rol_code)
    @JoinColumn({ name: 'use_role' })
    use_role!: Role;
}