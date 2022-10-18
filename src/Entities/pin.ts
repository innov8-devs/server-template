import { Entity, Column, ObjectIdColumn, BaseEntity, ObjectID } from 'typeorm';

@Entity()
export class Pin extends BaseEntity {
	@ObjectIdColumn()
	_id: string;

	@Column({length: 4})
	pin: number;

	@ObjectIdColumn()
	userId: ObjectID;
}
