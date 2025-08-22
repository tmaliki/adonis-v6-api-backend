import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'student_access_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.string('uuid').notNullable().unique()
      table
        .bigInteger('student_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('students')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('action').nullable()
      table.string('url').nullable()
      table.string('method').nullable()
      table
        .enum('access', ['successful', 'failed', 'accessed'], {
          useNative: true,
          enumName: 'access_enum',
        })
        .notNullable()
        .defaultTo('SUCCESSFUL')
      table.string('message').nullable()
      table.text('error_detail').nullable()
      table.string('ipv4', 50).nullable()
      table.string('ipv6', 100).nullable()
      table.string('user_agent').nullable()
      table.text('old_input').nullable()
      table.text('new_input').nullable()
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
