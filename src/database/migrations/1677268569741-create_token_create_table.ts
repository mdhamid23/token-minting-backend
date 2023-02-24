import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTokenCreateTable1677268569741 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "tokens",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "token_name",
                  type: "varchar",
                  isNullable: true,
                },
                { name: "token_symbol", type: "varchar", isNullable: true },
                { name: "decimals", type: "int", isNullable: true },
                { name: "set_supply_cap", type: "int", isNullable: true },
                { name: "initial_supply", type: "int", isNullable: true },
                { name: "wallet_address", type: "varchar", isNullable: true },
                { name: "contract_address", type: "varchar", isNullable: true },
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
        await queryRunner.dropTable("tokens", true);
    }

}
