import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'academic_years'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.string('uuid').notNullable().unique()
      table.date('start_date').notNullable().unique() // e.g. '2024-10-01'
      table.date('end_date').notNullable().unique() // e.g. '2025-07-31'
      table.string('date_label', 50).notNullable() // e.g. '2024-10-01 / 2025-07-31'
      table.string('start_year').notNullable().unique() // e.g. '2024'
      table.string('end_year').notNullable().unique() // e.g. '2025'
      table.string('year_label', 20).notNullable() // e.g. '2024-2025'
      table.date('enrolled_start_date').notNullable().unique() // e.g. '2025-08-01'
      table.date('enrolled_end_date').nullable().unique() // e.g. '2025-12-31'
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
