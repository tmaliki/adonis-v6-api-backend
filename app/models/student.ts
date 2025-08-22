import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  BaseModel,
  column,
  computed,
  beforeCreate,
  beforeSave,
  belongsTo,
  hasMany,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '#types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { v4 as uuidv4 } from 'uuid'
import Country from '#models/country'
import City from '#models/city'
import Civility from '#models/civility'
import Lang from '#models/lang'
import StudentAccessLog from '#models/student_access_log'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Student extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare matricule: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  @column({ serializeAs: null })
  declare password: string

  @column({ serializeAs: null })
  declare rememberToken: string | null

  @column()
  declare nationalityId: number

  @column()
  declare callPrefixId: number | null

  @column()
  declare phoneNumber: string | null

  @column()
  declare cityId: number | null

  @column()
  declare city_name: string | null

  @column()
  declare location: string | null

  @column.date()
  declare birthDate: DateTime | null

  @column()
  declare civilityId: number

  @column()
  declare langId: number

  @column()
  declare avatar: string | null

  @column()
  declare biography: string | null

  @column.dateTime()
  declare lastActivityAt: DateTime | null

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

  static accessTokens = DbAccessTokensProvider.forModel(Student, {
    expiresIn: '30 days',
    prefix: 'oatStudent_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  /**
   * All hooks should be declared here.
   * This allows for better organization and easier management of hooks.
   */
  @beforeCreate()
  static async assignUuid(item: Student) {
    item.uuid = uuidv4()
  }

  @beforeSave()
  static async hashPasswordHook(item: Student) {
    if (item.$dirty.password && item.password && item.password.trim() !== '') {
      item.password = await hash.make(item.password)
    }
  }

  /**
   * All relations should be declared here.
   * This allows for better organization and easier management of relations.
   */
  @belongsTo(() => Country, { foreignKey: 'nationalityId' })
  declare nationality: BelongsTo<typeof Country>

  @belongsTo(() => Country, { foreignKey: 'callPrefixId' })
  declare callPrefix: BelongsTo<typeof Country>

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @belongsTo(() => Civility)
  declare civility: BelongsTo<typeof Civility>

  @belongsTo(() => Lang)
  declare lang: BelongsTo<typeof Lang>

  @hasMany(() => StudentAccessLog)
  declare studentAccessLogs: HasMany<typeof StudentAccessLog>

  /**
   * Computed properties can be defined here.
   * This allows for better organization and easier management of computed properties.
   */
  @computed()
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
