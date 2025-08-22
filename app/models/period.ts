import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '#types/relations'
import Unit from '#models/unit'
import { v4 as uuidv4 } from 'uuid'

export default class Period extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column({ columnName: 'parent_id' })
  declare parentId: number | null

  @column({ columnName: 'type_id' })
  declare typeId: number | null

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare abbr: string

  @column()
  declare description: string | null

  @column()
  declare durationValue: number

  @column()
  declare unitId: number

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
  static async assignUuid(item: Period) {
    item.uuid = uuidv4()
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @belongsTo(() => Period, { foreignKey: 'parentId' })
  declare parent: BelongsTo<typeof Period>

  @hasMany(() => Period, { foreignKey: 'parentId' })
  declare children: HasMany<typeof Period>

  @belongsTo(() => Unit, { foreignKey: 'typeId' })
  declare type: BelongsTo<typeof Unit>

  @belongsTo(() => Unit)
  declare unit: BelongsTo<typeof Unit>
}
