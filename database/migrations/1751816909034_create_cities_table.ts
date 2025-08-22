import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.uuid('uuid').notNullable().unique()
      table
        .bigInteger('country_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.boolean('is_capital').notNullable().defaultTo(false)
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
