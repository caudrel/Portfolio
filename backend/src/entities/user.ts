import { Field, InputType, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import * as argon2 from 'argon2'
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator'
import { Exclude } from 'class-transformer'

export type Role = 'visitor' | 'admin'

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, nullable: true })
    @Field({ nullable: true })
    first_name: string

    @Column({ length: 50, nullable: true })
    @Field({ nullable: true })
    last_name: string

    @Field()
    @Column({ unique: true, length: 255 })
    email: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    password: string

    @Column({ default: 'local' }) // "local" ou "google"
    authProvider: 'local' | 'google'

    @BeforeInsert()
    @BeforeUpdate()
    protected async hashPassword() {
        if (this.authProvider === 'google' || !this.password) {
            return // Ne pas hasher si c'est un compte Google
        }
        const isHashed = this.password.startsWith('$argon2')
        if (!isHashed) {
            this.password = await argon2.hash(this.password)
        }
    }

    @Column('text', { nullable: true, unique: true })
    resetToken: string | null

    @Column('text', { nullable: true, unique: true })
    refreshToken?: string | null

    @Column({ default: null, type: 'date', nullable: true })
    @Field(() => Date, { nullable: true })
    validated_email: Date | null

    @Field()
    @Column({ enum: ['visitor', 'admin'], default: 'visitor' })
    role: Role

    @Field()
    @CreateDateColumn()
    created_at: string

    @Field()
    @UpdateDateColumn()
    modified_at: string
}

@ObjectType()
export class UserWOPassword {
    @Field(() => Int)
    id: number

    @Field()
    first_name: string

    @Field()
    last_name: string

    @Field()
    email: string

    @Field()
    role: Role

    @Field()
    created_at: string

    @Field()
    modified_at: string

    @Exclude()
    password: string
}

@ObjectType()
export class ResponseMessage {
    @Field()
    message: string

    @Field()
    success: boolean
}

@InputType()
export class EmailInput {
    @Field()
    @IsEmail(
        {},
        {
            message: 'Une adresse mail valide est requise',
        }
    )
    @IsNotEmpty({
        message: 'Veuillez renseigner votre email',
    })
    email: string
}

@InputType()
export class InputRegisterValidation {
    @Field()
    @IsNotEmpty({
        message: 'Le token est requis',
    })
    token: string

    @Field()
    @IsNotEmpty({
        message: 'Veuillez renseigner un prénom',
    })
    @Length(2, 50, {
        message: 'Le prénom doit contenir entre 2 et 50 caractères',
    })
    first_name: string

    @Field()
    @IsNotEmpty({
        message: 'Veuillez renseigner un nom de famille',
    })
    @Length(2, 50, {
        message: 'Le nom doit contenir entre 2 et 50 caractères',
    })
    last_name: string

    @Field()
    @IsNotEmpty({
        message: 'Veuillez renseigner un mot de passe',
    })
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message:
                'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un symbole.',
        }
    )
    password: string
}

@InputType()
export class InputLogin {
    @Field()
    @IsEmail(
        {},
        {
            message: 'Une adresse mail valide est requise',
        }
    )
    @IsNotEmpty({
        message: 'Veuillez renseigner votre email',
    })
    email: string

    @Field()
    @IsNotEmpty({
        message: 'Veuillez renseigner votre mot de passe',
    })
    password: string
}
