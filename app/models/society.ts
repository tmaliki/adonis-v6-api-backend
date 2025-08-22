import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '#types/relations'
import type { SocialMediaArray } from '#types/common'
import { DbHelper } from '#utils/db_helper'
import Country from '#models/country'
import { v4 as uuidv4 } from 'uuid'

export default class Society extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare countryId: number

  @column()
  declare name: string

  @column()
  declare acronym: string | null

  @column()
  declare slogan: string | null

  @column()
  declare email: string

  @column({ columnName: 'call_prefix_id' })
  declare callPrefixId: number | null

  @column()
  declare phoneNumber: string | null

  @column()
  declare location: string | null

  @column()
  declare seat: string | null

  @column()
  declare website: string | null

  @column()
  declare favicon: string | null

  @column()
  declare logo: string | null

  @column({
    columnName: 'social_medias',
    prepare: (value: SocialMediaArray | string | null) => (value ? JSON.stringify(value) : null),
    consume: (value: SocialMediaArray | string | null) => {
      try {
        if (typeof value === 'string') {
          return value ? JSON.parse(value) : null
        }
        return value
      } catch {
        return null
      }
    },
  })
  declare socialMedias: SocialMediaArray | null

  @column()
  declare bankName: string | null

  @column()
  declare bankAddress: string | null

  @column()
  declare rib: string | null

  @column()
  declare ribText: string | null

  @column()
  declare iban: string | null

  @column()
  declare ibanText: string | null

  @column()
  declare swiftCode: string | null

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
  static async assignUuid(item: Society) {
    item.uuid = uuidv4()
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @belongsTo(() => Country, { foreignKey: 'callPrefixId' })
  declare callPrefix: BelongsTo<typeof Country>

  /**
   * Getter/Setter methods can be defined here.
   * This allows for better organization and easier management of getter setter methods.
   */
  async getPhone() {
    return await DbHelper.getPhoneNumber({
      phone: this.phoneNumber ?? '',
      countryId: this.callPrefixId ?? undefined,
    })
  }
}
