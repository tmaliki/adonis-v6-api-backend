import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('tokenable_id').unsigned().notNullable()
      table
        .enum('tokenable_type', ['Default', 'Admin', 'Teacher', 'Student'], {
          useNative: true,
          enumName: 'tokenable_type_enum',
        })
        .notNullable()
        .defaultTo('Default')
      table
        .enum('type', ['access_token', 'refresh_token'], {
          useNative: true,
          enumName: 'type_enum',
        })
        .notNullable()
        .defaultTo('access_token')
      table.string('name').nullable()
      table.string('hash').notNullable().unique()
      table.json('abilities').nullable()
      table.timestamp('last_used_at').nullable()
      table.timestamp('expires_at').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      // indexes
      table.index(['tokenable_id', 'tokenable_type'], 'auth_tokens_owner_index')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
