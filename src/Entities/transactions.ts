import { Entity, Column, ObjectIdColumn, BaseEntity, ObjectID, CreateDateColumn, UpdateDateColumn } from 'typeorm';

type transactionStatus = "pending" | "failed" | "completed" | "canceled";
type transactionType = "deposit" | "withdrawal" | "transfer"


@Entity()
export class transactions extends BaseEntity {
	@ObjectIdColumn()
	_id: string;

	@Column({unique: true})
	txf: string;

	@ObjectIdColumn()
	userId: ObjectID;

	@Column({enum: ["pending", "failed", "completed", "canceled"], default: "pending"})
	status: transactionStatus;

	@Column({enum: ["deposit", "withdrawal", "transfer"], default: "deposit"})
	transactionType: transactionType

	@Column()
	openingBalance: number;


	@Column()
	closingBalance: number;

	@Column()
	amount: number;

	@Column()
	narration: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
