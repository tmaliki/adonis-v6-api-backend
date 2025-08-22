import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'countries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.uuid('uuid').notNullable().unique()
      table.string('name').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.string('nationality').nullable()
      table.string('iso_code2', 2).nullable()
      table.string('iso_code3', 3).nullable()
      table.integer('call_prefix').notNullable()
      table
        .bigInteger('currency_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('currencies')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('flag').nullable()
      table.boolean('contains_states').notNullable().defaultTo(false)
      table.boolean('need_identification_number').notNullable().defaultTo(false)
      table.boolean('need_zip_code').notNullable().defaultTo(1)
      table.string('zip_code_format', 20).nullable()
      table.boolean('display_tax_label').notNullable().defaultTo(true)
      table.boolean('is_in_our_countries_list').notNullable().defaultTo(false)
      table.boolean('is_in_this_country').notNullable().defaultTo(false)
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
