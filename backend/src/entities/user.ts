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
import { IsDateString, IsEmail, IsNotEmpty, Length } from "class-validator";

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
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Field()
  first_name: string;

  @Column({ length: 50 })
  @Field()
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
