import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, beforeSave } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'

export default class AcademicYear extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column()
  declare startYear: string

  @column()
  declare endYear: string

  @column()
  declare dateLabel: string

  @column()
  declare yearLabel: string

  @column.date()
  declare enrolledStartDate: DateTime

  @column.date()
  declare enrolledEndDate: DateTime | null

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
  static async assignUuid(item: AcademicYear) {
    item.uuid = uuidv4()
  }

  @beforeSave()
  public static setDerivedFields(item: AcademicYear) {
    if (item.startDate && item.endDate) {
      item.startYear = item.startDate.toFormat('yyyy')
      item.endYear = item.endDate.toFormat('yyyy')
      // item.dateLabel = `${item.startDate.toISODate()} / ${item.endDate.toISODate()}`
      // item.yearLabel = `${item.startYear}-${item.endYear}`
    }
  }
}
