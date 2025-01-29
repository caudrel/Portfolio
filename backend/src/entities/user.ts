import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as argon2 from "argon2";
import { IsDateString, isEmail, IsEmail, IsNotEmpty, IsStrongPassword, isStrongPassword, Length } from "class-validator";

export type Role = "visitor" | "admin";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    if (!this.password.startsWith("$argon2")) {
      this.password = await argon2.hash(this.password);
    }
  }
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Field({ nullable: true })
  first_name: string;

  @Column({ length: 50 })
  @Field({ nullable: true })
  last_name: string;

  @Field()
  @Column({ unique: true, length: 255 })
  email: string;

  // @Field()
  @Column({ length: 255 })
  password: string;

  // @Field(() => String, { nullable: true })
  @Column("text", { nullable: true, unique: true })
  token: string | null;

  @Column({ default: null, type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  validated_email: Date | null;

  @Field()
  @Column({ enum: ["visitor", "admin"], default: "visitor" })
  role: Role;

  @Field()
  @CreateDateColumn()
  created_at: string;

  @Field()
  @UpdateDateColumn()
  modified_at: string;
}

@ObjectType()
export class UserWOPassword {
  @Field(() => Int)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  role: Role;

  @Field()
  created_at: string;

  @Field()
  modified_at: string;
}

@ObjectType()
export class ResponseMessage {
  @Field()
  message: string;

  @Field()
  success: boolean;
}

@InputType()
export class CreateUserInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  @IsEmail(
    {},
    {
      message: "Une adresse mail valide est requise",
    }
  )
  @IsNotEmpty({
    message: "Veuillez renseigner votre email",
  })
  email: string;

  @Field()
  @IsNotEmpty({
    message: "Veuillez renseigner un mot de passe",
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
      message: "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un symbole.",
    }
  )
  password: string;
}

@InputType()
export class InputLogin {
  @Field()
  @IsEmail(
    {},
    {
      message: "Une adresse mail valide est requise",
    }
  )
  @IsNotEmpty({
    message: "Veuillez renseigner votre email",
  })
  email: string;

  @Field()
  @IsNotEmpty({
    message: "Veuillez renseigner votre mot de passe",
  })
  password: string;
}
