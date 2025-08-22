import slugifyModule from 'slugify'
import { v4 as uuidv4 } from 'uuid'
import { MomentHelper } from '#utils/moment_helper'
import { DbHelper } from '#utils/db_helper'
import Country from '#models/country'

const slugify = slugifyModule.default

export class TextFormatter {
  /**
   * Generate a slug from text
   * @param text
   * @param separator
   * @param isLower
   * @param isStrict
   * @returns
   */
  static getTextSlug = (text: string, separator = '-', isLower = true, isStrict = true): string => {
    return slugify(text, {
      lower: isLower,
      strict: isStrict,
      replacement: separator,
    })
  }

  /**
   * Generate a UUID
   * @param removeHyphens
   * @returns
   */
  static genUuid = (removeHyphens = false): string => {
    let myUuid = uuidv4()
    if (removeHyphens) {
      myUuid = myUuid.replace(/-/g, '')
    }
    return myUuid
  }

  /**
   * Generate a random string
   * @param length
   * @param options
   * @returns
   */
  static genRandString = (
    length = 128,
    options: {
      letters?: boolean
      numbers?: boolean
      specialChars?: boolean
    } = {
      letters: true,
      numbers: true,
      specialChars: false,
    }
  ): string => {
    const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const numericChars = '0123456789'
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?'

    let characters = ''
    let result = ''

    if (options.letters) characters += alphaChars
    if (options.numbers) characters += numericChars
    if (options.specialChars) characters += specialChars

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters[randomIndex]
    }

    return result
  }

  /**
   * Generate a reference string
   * @param options
   * @returns
   */
  static genRef = async (options: {
    prefix?: string
    hasYear?: boolean
    countryId?: number | null
    initials?: string | null
    inputDate?: string | null
    separator?: string
  }): Promise<string> => {
    const {
      prefix = 'REF',
      hasYear = true,
      countryId = null,
      initials = null,
      inputDate = null,
      separator = '-',
    } = options

    let reference = prefix

    if (hasYear) {
      const year = MomentHelper.dateTimeFormat({ dt: inputDate, outFt: 'YYYY' })
      reference += year.substring(2)
    }

    if (countryId) {
      const isoCode = await DbHelper.findTableRow({
        model: Country,
        selectOpt: { keys: { id: { value: countryId } } },
        colName: 'isoCode2',
      })

      if (isoCode?.bool && isoCode.dta) {
        reference += isoCode.dta
      }
    }

    if (initials) {
      reference += this.getInitials(initials)
    }

    if (separator) {
      reference += separator
    }

    return `${reference}${MomentHelper.genUnixTimestamp({ dt: inputDate })}`
  }

  /**
   * Get initials from first and last name
   * @param firstName
   * @param lastName
   * @param options
   * @returns
   */
  static getInitials = (
    firstName: string,
    lastName: string | null = null,
    options: {
      firstNameLength?: number
      lastNameLength?: number
      firstNameFrom?: 'start' | 'end'
      lastNameFrom?: 'start' | 'end'
    } = {}
  ): string => {
    const {
      firstNameLength = 1,
      lastNameLength = 1,
      firstNameFrom = 'start',
      lastNameFrom = 'start',
    } = options

    const getChars = (name: string, length: number, from: 'start' | 'end') => {
      return from === 'end' ? name.slice(-length) : name.slice(0, length)
    }

    const processName = (name: string, length: number, from: 'start' | 'end') =>
      name
        .split(/[\s-]/)
        .map((word) => getChars(word, length, from))
        .join('')

    const firstInitial = processName(firstName, firstNameLength, firstNameFrom)
    const lastInitial = lastName ? processName(lastName, lastNameLength, lastNameFrom) : ''

    return `${firstInitial}${lastInitial}`.toUpperCase()
  }

  /**
   * Convert newlines to <br> tags
   * Convert \n to <br/>
   * @param str
   * @param allowHtml
   * @returns
   */
  static nl2br = (str: string, allowHtml = true): string => {
    if (typeof str !== 'string') return ''
    if (!allowHtml) {
      str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
    return str.replace(/\n/g, '<br/>')
  }

  /**
   * Capitalize the first letter of a string
   * @param text
   * @returns
   */
  static capitalize = (text: string): string => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  /**
   * Truncate a string to a specified length and add ellipsis if needed
   * @param text
   * @param length
   * @returns
   */
  static truncate = (text: string, length: number): string => {
    return text.length <= length ? text : text.slice(0, length) + '...'
  }
}
