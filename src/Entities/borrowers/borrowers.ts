import { Entity, PrimaryColumn, Column } from "typeorm";
@Entity()
export class Borrower {
  @PrimaryColumn()
  id: number;
  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
