import {Entity, Column, ObjectIdColumn, BaseEntity} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export default class Borrower extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: number;

  @Field(() => String)
  @Column()
  firstName: string;
}
