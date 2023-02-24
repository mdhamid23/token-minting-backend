import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nft_order_sequence")
export class NftOrderSequenceFactory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sequence: number;
  @Column()
  name: string;
  @Column({
    type: "timestamp",
    default: new Date(),
  })
  createdAt: Date;
  @Column({
    type: "timestamp",
    default: new Date(),
  })
  updatedAt: Date;
}
