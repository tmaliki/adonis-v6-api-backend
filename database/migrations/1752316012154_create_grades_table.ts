import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'grades'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.string('uuid').notNullable().unique()
      table
        .bigInteger('enrollment_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('enrollments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .bigInteger('course_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('courses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .bigInteger('period_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('periods')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.float('score').notNullable()
      table.string('comment').nullable()
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
