import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Project } from "./project";
import { ArrayMinSize, ArrayNotEmpty, IsDateString, IsEmail, IsNotEmpty, Length, IsUrl } from "class-validator";

@Entity()
@ObjectType()
export class TeamMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 100 })
  @Field()
  name: string;

  @Column("text", { nullable: true })
  @Field(() => String, { nullable: true })
  linkedin: string | null;

  @Column({ length: 300, nullable: true })
  @Field()
  src_icon: string;

  @ManyToMany(() => Project, (project) => project.team_members)
  @Field(() => [Project])
  projects: Project[];
}

@ObjectType()
export class TeamMemberWOProjectRelation {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 100 })
  @Field()
  name: string;

  @Column({ length: 300, nullable: true })
  @Field()
  src_icon: string;

  @Column("text", { nullable: true })
  @Field(() => String, { nullable: true })
  linkedin: string | null;
}

@InputType()
export class MemberInput {
  @Field()
  @Length(5, 100, {
    message: "Le nom du co-équipier doit contenir entre 5 et 100 caractères",
  })
  @IsNotEmpty({ message: "Le nom du co-équipier ne peut pas être vide" })
  name: string;

  @Field(() => String, { nullable: true })
  @IsUrl()
  linkedin: string | null;

  @Field()
  @IsNotEmpty({ message: "Le lien de la photo du co-équipier ne peut pas être vide" })
  src_icon: string;
}
