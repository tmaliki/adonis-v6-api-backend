import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '#types/relations'
import Currency from '#models/currency'
import City from '#models/city'
import { v4 as uuidv4 } from 'uuid'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare nationality: string | null

  @column({ columnName: 'iso_code2', serializeAs: 'isoCode2' })
  declare isoCode2: string | null

  @column({ columnName: 'iso_code3', serializeAs: 'isoCode3' })
  declare isoCode3: string | null

  @column()
  declare callPrefix: number

  @column()
  declare currencyId: number | null

  @column()
  declare flag: string | null

  @column()
  declare containsStates: boolean

  @column()
  declare needIdentificationNumber: boolean

  @column()
  declare needZipCode: boolean

  @column()
  declare zipCodeFormat: string | null

  @column()
  declare displayTaxLabel: boolean

  @column()
  declare isInOurCountriesList: boolean

  @column()
  declare isInThisCountry: boolean

  @column()
  declare sortOrder: number

  @column()
  declare actived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime

  /**
   * All hooks should be declared here.
   * This allows for better organization and easier management of hooks.
   */
  @beforeCreate()
  static async assignUuid(item: Country) {
    item.uuid = uuidv4()
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @belongsTo(() => Currency)
  declare currency: BelongsTo<typeof Currency>

  @hasMany(() => City)
  declare cities: HasMany<typeof City>
}
