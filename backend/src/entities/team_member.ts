import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Project } from "./project";

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
