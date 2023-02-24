import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  token_name: string;

  @Column()
  token_symbol: string;

  @Column()
  decimals:number;

  @Column()
  set_supply_cap:number

  @Column()
  initial_supply:number;

  @Column()
  wallet_address:string;

  @Column()
  contract_address:string;

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
