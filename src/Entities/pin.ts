import {Entity, Column, ObjectIdColumn, BaseEntity} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export default class Pin extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	_id: number;

	@Field(() => String)
	@Column({length: 4})
	pin: number;

	@Field(() => ID)
	@ObjectIdColumn()
	userId: string;
}
