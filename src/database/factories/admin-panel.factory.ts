import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("white_listed_addresses")
export class AdminFactory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  white_listed_address: string;

  @Column()
  role: string;

  @Column()
  is_active: boolean;

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
