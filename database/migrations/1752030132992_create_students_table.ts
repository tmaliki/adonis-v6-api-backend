import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements()
      table.string('uuid').notNullable().unique()
      table.string('matricule').notNullable().unique()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('username', 25).notNullable().unique()
      table.string('email').notNullable().unique()
      table.datetime('email_verified_at').nullable()
      table.string('password').notNullable()
      table.string('remember_token', 100).nullable().unique()
      table
        .bigInteger('nationality_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .bigInteger('call_prefix_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('phone_number', 55).nullable()
      table
        .bigInteger('city_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('city_name', 100).nullable()
      table.string('location').nullable()
      table.date('birth_date').nullable()
      table
        .bigInteger('civility_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('civilities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .bigInteger('lang_id')
        .notNullable()
        .defaultTo(1)
        .unsigned()
        .references('id')
        .inTable('langs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('avatar').nullable()
      table.text('biography').nullable()
      table.datetime('last_activity_at').nullable()
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
