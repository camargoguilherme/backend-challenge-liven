import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAddress1637576833590 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_address',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int(11)',
          },
          {
            name: 'street',
            type: 'varchar(250)',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'additional_addres',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'postal_code',
            type: 'varchar(9)',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
          }
        ]
      })
    )

    await queryRunner.createForeignKey('tb_address',
      new TableForeignKey({
        name: 'FK_ADDRESS_USER_ID',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_address', 'FK_ADDRESS_USER_ID');
    await queryRunner.dropTable('tb_address');
  }


}
