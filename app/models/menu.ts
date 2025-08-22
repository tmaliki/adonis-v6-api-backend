import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  belongsTo,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '#types/relations'
import type { MenuLabelEnum, MenuLayoutEnum } from '#types/common'
import Admin from '#models/admin'
import { v4 as uuidv4 } from 'uuid'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column({ columnName: 'parent_id' })
  declare parentId: number | null

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare label: MenuLabelEnum

  @column()
  declare layout: MenuLayoutEnum

  @column()
  declare method: string

  @column()
  declare path: string | null

  @column()
  declare icon: string | null

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
  static async assignUuid(item: Menu) {
    item.uuid = uuidv4()
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @belongsTo(() => Menu, { foreignKey: 'parentId' })
  declare parent: BelongsTo<typeof Menu>

  @hasMany(() => Menu, { foreignKey: 'parentId' })
  declare children: HasMany<typeof Menu>

  @manyToMany(() => Admin, {
    pivotTable: 'admins_menus',
    localKey: 'id',
    pivotForeignKey: 'menu_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'admin_id',
  })
  declare admins: ManyToMany<typeof Admin>
}
