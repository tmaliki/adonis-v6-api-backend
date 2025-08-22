import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.string('uuid').notNullable().unique()
      table
        .bigInteger('module_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('modules')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .bigInteger('field_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('fields')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.float('coefficient').notNullable()
      table.string('description').nullable()
      table.string('cover_image').nullable()
      table.string('technical_sheet').nullable()
      table.text('program').nullable()
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
