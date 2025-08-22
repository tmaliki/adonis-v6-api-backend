import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { TokenTypeEnum, TokenableTypeEnum } from '#types/common'

export default class AuthAccessToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tokenableId: number

  @column()
  declare tokenableType: TokenableTypeEnum

  @column()
  declare type: TokenTypeEnum

  @column()
  declare name?: string

  @column()
  declare hash: string

  @column({
    columnName: 'abilities',
    prepare: (value: string[] | string | null) => (value ? JSON.stringify(value) : null),
    consume: (value: string[] | string | null) => {
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
  declare abilities: string[] | null

  @column.dateTime({ serializeAs: 'last_used_at' })
  declare lastUsedAt?: DateTime

  @column.dateTime({ serializeAs: 'expires_at' })
  declare expiresAt?: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime
}
