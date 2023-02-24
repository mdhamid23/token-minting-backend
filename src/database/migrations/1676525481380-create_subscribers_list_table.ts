import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSubscribersListTable1676525481380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "subscribers_list",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "email_address",
                  type: "varchar",
                  isNullable: false,
                  isUnique: true,
                },
                { name: "status", type: "varchar", isNullable: false },
                {
                  name: "created_at",
                  type: "timestamp",
                  isNullable: true,
                  default: "CURRENT_TIMESTAMP(6)",
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  isNullable: true,
                  default: "CURRENT_TIMESTAMP(6)",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("subscribers_list", true);
    }

}
