import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'societies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.uuid('uuid').notNullable().unique()
      table
        .bigInteger('country_id')
        .notNullable()
        .defaultTo(152)
        .unsigned()
        .references('id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('acronym').nullable()
      table.string('slogan').nullable()
      table.string('email').notNullable()
      table
        .bigInteger('call_prefix_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('phone_number', 55).nullable()
      table.string('location').nullable()
      table.string('seat').nullable()
      table.string('website').nullable()
      table.string('favicon').nullable()
      table.string('logo').nullable()
      table.json('social_medias').nullable()
      table.string('bank_name').nullable()
      table.string('bank_address').nullable()
      table.string('rib').nullable()
      table.string('rib_text').nullable()
      table.string('iban').nullable()
      table.string('iban_text').nullable()
      table.string('swift_code').nullable()
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
