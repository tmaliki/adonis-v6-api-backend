import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'periods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.string('uuid').notNullable().unique()
      table
        .bigInteger('parent_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('periods')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .bigInteger('type_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('units')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 100).notNullable().unique() // e.g. 'Semestre 1'
      table.string('slug', 100).notNullable().unique()
      table.string('abbr', 20).nullable()
      table.string('description').nullable()
      table.integer('duration_value').notNullable().unsigned().defaultTo(1)
      table
        .bigInteger('unit_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('units')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
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
