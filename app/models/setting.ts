import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@adonisjs/lucid/orm'
import type { KeyValueObject, MailAddressMap } from '#types/common'
import { v4 as uuidv4 } from 'uuid'

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column({
    columnName: 'back_config',
    prepare: (value: KeyValueObject | string | null) => (value ? JSON.stringify(value) : null),
    consume: (value: KeyValueObject | string | null) => {
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
  declare backConfig: KeyValueObject | null

  @column({
    columnName: 'front_config',
    prepare: (value: KeyValueObject | string | null) => (value ? JSON.stringify(value) : null),
    consume: (value: KeyValueObject | string | null) => {
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
  declare frontConfig: KeyValueObject | null

  @column({
    columnName: 'mail_address',
    prepare: (value: MailAddressMap | string | null) => (value ? JSON.stringify(value) : null),
    consume: (value: MailAddressMap | string | null) => {
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
  declare mailAddress: MailAddressMap | null

  @column()
  declare passwordAttemptLimit: number

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
  static async assignUuid(item: Setting) {
    item.uuid = uuidv4()
  }
}
