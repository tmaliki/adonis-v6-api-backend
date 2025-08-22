import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'password_resets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('email').notNullable().index()
      table.string('token').notNullable().unique()
      table.timestamp('expires_at').notNullable()
      table
        .enum('panel', ['default', 'admin', 'teacher', 'student'], {
          useNative: true,
          enumName: 'panel_enum',
        })
        .notNullable()
        .defaultTo('default')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
