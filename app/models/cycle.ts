import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '#types/relations'
import Level from '#models/level'
import Formation from '#models/formation'
import { v4 as uuidv4 } from 'uuid'

export default class Cycle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare levelId: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

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
  static async assignUuid(item: Cycle) {
    item.uuid = uuidv4()
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @belongsTo(() => Level)
  declare level: BelongsTo<typeof Level>

  @hasMany(() => Formation)
  declare cities: HasMany<typeof Formation>
}
