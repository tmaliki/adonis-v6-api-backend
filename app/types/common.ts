// types/common.ts

/**
 * Object types for common use cases
 */
export type AnyValueObject = Record<string, any>
export type KeyValueObject = Record<string, string | number | boolean | null>
export type ObjectWithArrayValues = Record<string, any[]>
export type DeepObject = { [key: string]: string | number | boolean | null | DeepObject | any[] }

/**
 * Array types for common use cases
 */
export type AnyArray = any[]
export type StringArray = string[]
export type NumberArray = number[]
export type BooleanArray = boolean[]
export type ArrayOfAnyObjects = Array<Record<string, any>>
export type ArrayOfKeyValueObjects = Array<Record<string, string | number | boolean | null>>

/**
 * Social media link structure
 * Object Example: { platform: 'facebook', key: 'facebook', icon: 'fab fa-facebook', url: 'https://facebook.com/yourpage' }
 * Array Example: [{ platform: 'facebook', key: 'facebook', icon: 'fab fa-facebook', url: 'https://facebook.com/yourpage' }, { platform: 'twitter', key: 'twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/yourprofile' }]
 */
export interface SocialMediaKeys {
  platform: string
  key: string
  icon?: string
  url: string
}
export type SocialMediaArray = SocialMediaKeys[]

/**
 * Mail address structure
 */
export interface MailAddressKeys {
  value: string
  name: string
}
export type MailAddressMap = Record<string, MailAddressKeys>

/**
 * Enum types for common use cases 'access_token', 'refresh_token'
 * These enums are used to define various categories, guards, and visibility options in the application.
 */
export type AccessLogEnum = 'successful' | 'failed' | 'accessed'
export type TokenTypeEnum = 'access_token' | 'refresh_token'
export type TokenableTypeEnum = 'Default' | 'Admin' | 'Teacher' | 'Student'
export type VisibilityEnum = 'default' | 'public' | 'private' | 'internal'
export type TargetGuardEnum = 'default' | 'admin' | 'teacher' | 'student' | 'shared'
export type UnitCategoryEnum = 'default' | 'duration'
export type StatusCategoryEnum = 'default' | 'enrollment'
export type LevelCategoryEnum = 'default' | 'cycle' | 'grade' | 'study'
export type TypeCategoryEnum =
  | 'default'
  | 'formation'
  | 'evaluation'
  | 'document'
  | 'identity'
  | 'department'
export type MenuLabelEnum =
  | 'access'
  | 'read'
  | 'write'
  | 'del'
  | 'export'
  | 'import'
  | 'download'
  | 'upload'
export type MenuLayoutEnum =
  | 'action'
  | 'action_access'
  | 'topbar'
  | 'topbar_action'
  | 'sidebar'
  | 'sidebar_action'
  | 'topbar_sidebar'
  | 'topbar_sidebar_action'
