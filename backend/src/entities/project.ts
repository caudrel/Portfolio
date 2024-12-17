import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { IsDateString, IsNotEmpty, Length } from "class-validator";
import { TeamMember } from "./team_member";
import { Technology } from "./technology";
import { TeamMemberWOProjectRelation } from "./team_member";
import { TechnologyWOProjectRelation } from "./technology";

@Entity()
@ObjectType()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 20 })
  @Field()
  title: string;

  @Column({ length: 20 })
  @Field()
  slug: string;

  @Column({ type: "date" })
  @Field(() => String)
  completion_date: Date;

  @Column({ length: 200 })
  @Field()
  duration: string;

  @Column({ length: 250 })
  @Field()
  excerpt: string;

  @Column("text")
  @Field()
  description: string;

  @Column("text", { nullable: true })
  @Field(() => String, { nullable: true })
  area_of_improvement: string | null;

  @Column()
  @Field(() => Boolean, { defaultValue: false })
  prof_env: boolean;

  @Column({ nullable: true, type: "varchar", length: 200 })
  @Field(() => String, { nullable: true })
  company_name: string | null;

  @Column({ nullable: true, type: "varchar", length: 200 })
  @Field(() => String, { nullable: true })
  src_picture: string | null;

  @Column({ nullable: true, type: "varchar", length: 200 })
  @Field(() => String, { nullable: true })
  src_video: string | null;

  @ManyToMany(() => TeamMember, (teamMember) => teamMember.projects, { nullable: true })
  @JoinTable()
  @Field(() => [TeamMember], { nullable: true })
  team_members: TeamMember[] | null;

  @ManyToMany(() => Technology, (technology) => technology.projects)
  @JoinTable()
  @Field(() => [Technology])
  technologies: Technology[];

  @CreateDateColumn()
  @Field()
  created_at: string;

  @UpdateDateColumn()
  @Field()
  updated_at: string;
}

@ObjectType()
export class ProjectCard {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 20 })
  @Field()
  title: string;

  @Column({ length: 20 })
  @Field()
  slug: string;

  @Column({ type: "date" })
  @Field(() => String)
  completion_date: Date;

  @Column({ length: 250 })
  @Field()
  excerpt: string;

  @Column()
  @Field(() => Boolean, { defaultValue: false })
  prof_env: boolean;

  @Column({ nullable: true, type: "varchar", length: 200 })
  @Field(() => String, { nullable: true })
  company_name: string | null;

  @Column({ nullable: true, type: "varchar", length: 200 })
  @Field(() => String, { nullable: true })
  src_picture: string | null;

  @Field(() => [TeamMemberWOProjectRelation], { nullable: true })
  team_members: TeamMemberWOProjectRelation[] | null;

  @Field(() => [TechnologyWOProjectRelation])
  technologies: TechnologyWOProjectRelation[];
}
