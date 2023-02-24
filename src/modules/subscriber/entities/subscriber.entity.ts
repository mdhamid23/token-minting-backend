import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subscribers_list")
export class Subscriber {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email_address: string;

  @Column()
  status: string;

  @Column({
    type: "timestamp",
    default: new Date(),
  })
  created_at?: Date;

  @Column({
    type: "timestamp",
    default: new Date(),
  })
  updated_at?: Date;
}
