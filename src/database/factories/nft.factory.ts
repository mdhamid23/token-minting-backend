import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nfts")
export class NftFactory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @Column()
  description?: string;

  @Column()
  image?: string;

  @Column()
  attributes?: string;

  @Column()
  type?: string;

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
