import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'admins_menus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('admin_id').notNullable().unsigned()
      table.bigInteger('menu_id').notNullable().unsigned()
      table.primary(['admin_id', 'menu_id'])
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
