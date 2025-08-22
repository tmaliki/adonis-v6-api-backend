import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fields'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.string('uuid').notNullable().unique()
      table
        .bigInteger('formation_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('formations')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 155).notNullable().unique()
      table.string('slug', 155).notNullable().unique()
      table.string('sigle', 20).nullable()
      table.string('label').nullable()
      table.string('label_abbr', 20).nullable()
      table.string('description').nullable()
      table.string('cover_image').nullable()
      table.string('technical_sheet').nullable()
      table.text('content_detail').nullable()
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
