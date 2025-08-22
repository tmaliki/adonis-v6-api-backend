import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'courses_periods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('course_id').notNullable().unsigned()
      table.bigInteger('period_id').notNullable().unsigned()
      table.primary(['course_id', 'period_id'])
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
