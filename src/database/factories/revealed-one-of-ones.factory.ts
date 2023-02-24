import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("revealed_one_of_ones")
export class RevealedOneOfOnesFactory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: false })
  is_revealed: boolean;
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
