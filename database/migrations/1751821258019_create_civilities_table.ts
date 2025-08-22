import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'civilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.uuid('uuid').notNullable().unique()
      table.string('name', 55).notNullable().unique()
      table.string('slug', 55).notNullable().unique()
      table.string('title', 55).notNullable()
      table.string('title_abbr', 5).notNullable()
      table.string('sex', 55).notNullable()
      table.string('sex_abbr', 5).notNullable()
      table.string('description').nullable()
      table.bigInteger('sort_order').notNullable().unsigned().defaultTo(1)
      table.boolean('actived').notNullable().defaultTo(true)
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
