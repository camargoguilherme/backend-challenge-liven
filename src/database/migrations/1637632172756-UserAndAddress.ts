import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndAddress1637632172756 implements MigrationInterface {
  name = 'UserAndAddress1637632172756'

  public async up(queryRunner: QueryRunner): Promise<void> {
    //await queryRunner.query(`CREATE TABLE \`base_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`tb_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_4402e5176d3d51b228b3466d07\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`tb_address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`additional_addres\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`postal_code\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`tb_address\` ADD CONSTRAINT \`FK_b6b7db00323562c4ab18083a31f\` FOREIGN KEY (\`userId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`tb_address\` DROP FOREIGN KEY \`FK_b6b7db00323562c4ab18083a31f\``);
    await queryRunner.query(`DROP TABLE \`tb_address\``);
    await queryRunner.query(`DROP INDEX \`IDX_4402e5176d3d51b228b3466d07\` ON \`tb_users\``);
    await queryRunner.query(`DROP TABLE \`tb_users\``);
    //await queryRunner.query(`DROP TABLE \`base_model\``);
  }

}
