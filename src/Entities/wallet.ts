import { Entity, Column, ObjectIdColumn, BaseEntity, ObjectID } from 'typeorm';

@Entity()
export class wallet extends BaseEntity {
	@ObjectIdColumn()
	_id: string;

	@Column({default: 0})
	balance: number;

	@ObjectIdColumn()
	userId: ObjectID;
}
