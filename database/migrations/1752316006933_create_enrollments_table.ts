import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enrollments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.string('uuid').notNullable().unique()
      table
        .bigInteger('student_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('students')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .bigInteger('academic_year_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('academic_years')
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
      table.date('enrolled_date').notNullable()
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
