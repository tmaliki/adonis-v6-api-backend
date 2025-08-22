import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'menus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.uuid('uuid').notNullable().unique()
      table
        .bigInteger('parent_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('menus')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable().unique()
      table.string('slug').notNullable().unique()
      table
        .enum(
          'label',
          ['access', 'read', 'write', 'del', 'export', 'import', 'download', 'upload'],
          { useNative: true, enumName: 'label_enum' }
        )
        .notNullable()
        .defaultTo('access')
      table
        .enum(
          'layout',
          [
            'action',
            'action_access',
            'topbar',
            'topbar_action',
            'sidebar',
            'sidebar_action',
            'topbar_sidebar',
            'topbar_sidebar_action',
          ],
          { useNative: true, enumName: 'layout_enum' }
        )
        .notNullable()
        .defaultTo('action')
      table.string('method').unique()
      table.string('path').nullable()
      table.string('icon').nullable()
      table.text('description').nullable()
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
