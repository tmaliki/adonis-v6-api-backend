import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '#types/relations'
import type { TypeCategoryEnum, TargetGuardEnum, VisibilityEnum } from '#types/common'
import Formation from '#models/formation'
import { v4 as uuidv4 } from 'uuid'

export default class Type extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare abbr: string

  @column()
  declare description: string | null

  @column()
  declare category: TypeCategoryEnum

  @column()
  declare targetGuard: TargetGuardEnum

  @column()
  declare visibility: VisibilityEnum

  @column()
  declare uploadable: boolean

  @column()
  declare generatedByApp: boolean

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
  static async assignUuid(item: Type) {
    item.uuid = uuidv4()
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @hasMany(() => Formation)
  declare cities: HasMany<typeof Formation>
}
