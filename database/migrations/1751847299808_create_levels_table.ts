import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'levels'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.uuid('uuid').notNullable().unique()
      table.string('name', 100).notNullable()
      table.string('slug', 100).notNullable()
      table.string('description').nullable()
      table
        .enum('category', ['default', 'cycle', 'study'], {
          useNative: true,
          enumName: 'category_enum',
        })
        .notNullable()
        .defaultTo('default')
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
