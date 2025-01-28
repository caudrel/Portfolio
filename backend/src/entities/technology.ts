import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Project } from "./project";
import { ArrayMinSize, ArrayNotEmpty, IsDateString, IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity()
@ObjectType()
export class Technology extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 20 })
  @Field()
  name: string;

  @Column({ length: 200 })
  @Field()
  src_icon: string;

  @ManyToMany(() => Project, (project) => project.technologies, { nullable: true })
  @Field(() => [Project], { nullable: true })
  projects: Project[] | null;
}

@ObjectType()
export class TechnologyWOProjectRelation {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 20 })
  @Field()
  name: string;

  @Column({ length: 200 })
  @Field()
  src_icon: string;
}

@InputType()
export class TechnologyInput {
  @Field()
  @Length(3, 20, {
    message: "Le nom de la technologie doit contenir entre 3 et 20 caractères",
  })
  @IsNotEmpty({ message: "Le nom de la technologie ne peut pas être vide" })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Le lien de la technologie ne peut pas être vide" })
  src_icon: string;
}
