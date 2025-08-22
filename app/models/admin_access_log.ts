import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '#types/relations'
import type { AccessLogEnum } from '#types/common'
import Admin from '#models/admin'
import { v4 as uuidv4 } from 'uuid'

export default class AdminAccessLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare adminId: bigint | null

  @column()
  declare action: string | null

  @column()
  declare url: string | null

  @column()
  declare method: string | null

  @column()
  declare access: AccessLogEnum

  @column()
  declare message: string | null

  @column()
  declare errorDetail: string | null

  @column()
  declare ipv4: string | null

  @column()
  declare ipv6: string | null

  @column()
  declare userAgent: string | null

  @column()
  declare oldInput: string | null

  @column()
  declare newInput: string | null

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
  static async assignUuid(item: AdminAccessLog) {
    item.uuid = uuidv4()
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @belongsTo(() => Admin)
  declare admin: BelongsTo<typeof Admin>
}
