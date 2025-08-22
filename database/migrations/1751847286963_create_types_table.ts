import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.uuid('uuid').notNullable().unique()
      table.string('name', 100).notNullable()
      table.string('slug', 100).notNullable()
      table.string('abbr', 20).nullable()
      table.string('description').nullable()
      table
        .enum(
          'category',
          ['default', 'formation', 'evaluation', 'document', 'identity', 'department'],
          {
            useNative: true,
            enumName: 'category_enum',
          }
        )
        .notNullable()
        .defaultTo('default')
      table
        .enum('target_guard', ['default', 'admin', 'teacher', 'student', 'shared'], {
          useNative: true,
          enumName: 'target_guard_enum',
        })
        .notNullable()
        .defaultTo('default')
      table
        .enum('visibility', ['default', 'public', 'private', 'internal'], {
          useNative: true,
          enumName: 'visibility_enum',
        })
        .notNullable()
        .defaultTo('default')
      table.boolean('uploadable').notNullable().defaultTo(false)
      table.boolean('generated_by_app').notNullable().defaultTo(false)
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
