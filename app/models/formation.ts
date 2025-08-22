import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '#types/relations'
import Type from '#models/type'
import Cycle from '#models/cycle'
import Unit from '#models/unit'
import Field from '#models/field'
import { v4 as uuidv4 } from 'uuid'

export default class Formation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare typeId: number

  @column()
  declare cycleId: number | null

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare sigle: string | null

  @column()
  declare label: string | null

  @column()
  declare labelAbbr: string | null

  @column()
  declare description: string | null

  @column()
  declare coverImage: string | null

  @column()
  declare technicalSheet: string | null

  @column()
  declare contentDetail: string | null

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
  static async assignUuid(item: Formation) {
    item.uuid = uuidv4()
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @belongsTo(() => Type)
  declare type: BelongsTo<typeof Type>

  @belongsTo(() => Cycle)
  declare cycle: BelongsTo<typeof Cycle>

  @belongsTo(() => Unit)
  declare unit: BelongsTo<typeof Unit>

  @hasMany(() => Field)
  declare fields: HasMany<typeof Field>
}
