import {Entity, Column, ObjectIdColumn, BaseEntity} from "typeorm";

@Entity()

export default class Borrower extends BaseEntity {
  @ObjectIdColumn()
  _id: number;

  @Column()
  firstName: string;
}
