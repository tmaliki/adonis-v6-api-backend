import type { LucidModel, LucidRow } from '@adonisjs/lucid/types/model'
import logger from '@adonisjs/core/services/logger'
import Civility from '#models/civility'
import Country from '#models/country'
import Society from '#models/society'
import Setting from '#models/setting'

export interface KeyCondition {
  value: any
  condition?: string | '=' | '!=' | '<' | '>' | '<=' | '>=' | 'like' | 'LIKE'
}

export type Keys = Record<string, KeyCondition>

export interface Relations {
  with?: Array<string | { relation: string; callback: (builder: any) => void }>
  whereHas?: Array<string | { relation: string; callback: (builder: any) => void }>
}

export interface SelectParams {
  keys?: Keys // conditions to filter rows
  relations?: Relations // relations to preload or filter
  orders?: Array<{ col: string; drec?: 'asc' | 'desc' }> // order by columns
  columns?: string[] // columns to select
  paginate?: {
    page: number
    limit: number
  } // pagination options
}

export interface QueryParams {
  model: LucidModel // model to query
  selectOpt?: SelectParams // options for selecting rows
  colName?: string // column name to return specific value
  isQuery?: boolean // if true, returns the query builder instead of executing it
  debug?: boolean // if true, returns the SQL query instead of executing it
}

export interface DataResult<T> {
  bool: boolean
  dta: T | null
}

export interface FindParams {
  keys?: Record<string, KeyCondition>
  id?: number
  col?: string
  returnDta?: boolean
  defaultVal?: any
}

export interface FullNameParams {
  fName?: string
  lName?: string
  dbOpt?: {
    model: any
    keys: Record<string, KeyCondition>
    columns: [string, string]
  }
  civility?: {
    id: number | string
    col?: string
  }
  format?: 'fr' | 'en'
}

export interface PhoneNumberParams {
  phone: string
  countryId?: number
  prefix?: string
}

export class DbHelper {
  static getFullName = async (options: FullNameParams) => {
    try {
      let { fName = '', lName = '', dbOpt, civility, format = 'fr' } = options
      if (!fName && !lName && dbOpt) {
        const { model, keys, columns } = dbOpt
        const tableRow = await this.findTableRow({ model: model, selectOpt: { keys } })
        if (tableRow.bool && tableRow.dta) {
          fName = tableRow.dta[columns[0]]
          lName = tableRow.dta[columns[1]]
        }
      }

      let fullName = format === 'fr' ? `${lName} ${fName}` : `${fName} ${lName}`
      if (civility) {
        const { id, col = 'titleAbbr' } = civility
        const civilityCol = await this.findTableRow({
          model: Civility,
          selectOpt: { keys: { id: { value: id } } },
          colName: col,
        })
        if (civilityCol.bool && civilityCol.dta) {
          fullName = `${civilityCol.dta} ${fullName}`
        }
      }

      return fullName
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `getFullName error`)
      console.error(`getFullName error : ${errorMessage}`)
      return ''
    }
  }

  static getPhoneNumber = async (options: PhoneNumberParams) => {
    try {
      const { phone, countryId = 0, prefix = '+' } = options
      const callPrefix = await this.findCountry({
        keys: { id: { value: countryId } },
        col: 'callPrefix',
      })
      return callPrefix ? `${prefix}${callPrefix} ${phone}` : phone
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `getPhoneNumber error`)
      console.error(`getPhoneNumber error : ${errorMessage}`)
      return ''
    }
  }

  static findCivility = async (options: FindParams) => {
    try {
      const { keys, col = '', returnDta = true, defaultVal = '' } = options
      const civility = await this.findTableRow({
        model: Civility,
        selectOpt: { keys },
        colName: col,
      })

      if (civility && civility.bool && civility.dta) {
        return returnDta ? civility.dta : civility
      }
      return returnDta ? defaultVal : null
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `findCivility error`)
      console.error(`findCivility error : ${errorMessage}`)
      return null
    }
  }

  static findCountry = async (options: FindParams) => {
    try {
      const { keys, col = '', returnDta = true, defaultVal = '' } = options
      const country = await this.findTableRow({
        model: Country,
        selectOpt: { keys },
        colName: col,
      })

      if (country && country.bool && country.dta) {
        return returnDta ? country.dta : country
      }
      return returnDta ? defaultVal : null
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `findCountry error`)
      console.error(`findCountry error : ${errorMessage}`)
      return null
    }
  }

  static findSociety = async (options: FindParams = {}) => {
    try {
      const { id = 1, col = '', returnDta = true, defaultVal = '' } = options
      const society = await this.findTableRow({
        model: Society,
        selectOpt: { keys: { id: { value: id } } },
        colName: col,
      })

      if (society && society.bool && society.dta) {
        return returnDta ? society.dta : society
      }
      return returnDta ? defaultVal : null
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `findSociety error`)
      console.error(`findSociety error : ${errorMessage}`)
      return null
    }
  }

  static findSetting = async (options: FindParams = {}) => {
    try {
      const { id = 1, col = '', returnDta = true, defaultVal = '' } = options
      const setting = await this.findTableRow({
        model: Setting,
        selectOpt: { keys: { id: { value: id } } },
        colName: col,
      })

      if (setting && setting.bool && setting.dta) {
        return returnDta ? setting.dta : setting
      }
      return returnDta ? defaultVal : null
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `findSetting error`)
      console.error(`findSetting error : ${errorMessage}`)
      return null
    }
  }

  static findTableRow = async (options: QueryParams): Promise<DataResult<any>> => {
    try {
      const { model, selectOpt = {}, colName = '', isQuery = false, debug = false } = options
      const { keys, relations, columns, orders } = selectOpt
      const query = model.query()

      if (keys) {
        for (const [key, { value, condition = '=' }] of Object.entries(keys)) {
          query.where(key, condition, value)
        }
      }

      // handle relations
      if (relations) {
        // whereHas
        relations?.whereHas?.forEach((item) => {
          if (typeof item === 'string') {
            query.whereHas(item as any, (subQuery) => {
              subQuery.whereNotNull('id')
            })
          } else if (item?.relation && typeof item.callback === 'function') {
            query.whereHas(item.relation as any, item.callback)
          }
        })

        // with
        relations?.with?.forEach((item) => {
          if (typeof item === 'string') {
            query.preload(item as any)
          } else if (item?.relation && typeof item.callback === 'function') {
            query.preload(item.relation as any, item.callback)
          }
        })
      }

      // handle columns
      if (columns && columns?.length) query.select(columns)

      // handle orders
      orders?.forEach(({ col, drec = 'asc' }) => query.orderBy(col, drec))

      // case debug (return SQL)
      if (debug) return { bool: true, dta: query.toSQL().toNative() }

      // query only
      if (isQuery) return { bool: true, dta: query }

      // fetch first row
      const row: LucidRow = await query.firstOrFail()
      if (!row) return { bool: false, dta: null }

      const result = colName ? row[colName as keyof LucidRow] : row
      return { bool: true, dta: result }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `DB_CATCH_ERROR`)
      return { bool: false, dta: `DB_CATCH_ERROR : ${errorMessage}` }
    }
  }

  static getTableRows = async (options: QueryParams): Promise<DataResult<any>> => {
    try {
      const { model, selectOpt = {}, isQuery = false, debug = false } = options
      const { keys = {}, relations, columns, orders, paginate } = selectOpt
      const query = model.query()

      if (keys) {
        for (const [key, { value, condition = '=' }] of Object.entries(keys)) {
          query.where(key, condition, value)
        }
      }

      // handle relations
      if (relations) {
        // whereHas
        relations?.whereHas?.forEach((item) => {
          if (typeof item === 'string') {
            query.whereHas(item as any, (subQuery) => {
              subQuery.whereNotNull('id')
            })
          } else if (item?.relation && typeof item.callback === 'function') {
            query.whereHas(item.relation as any, item.callback)
          }
        })

        // with
        relations?.with?.forEach((item) => {
          if (typeof item === 'string') {
            query.preload(item as any)
          } else if (item?.relation && typeof item.callback === 'function') {
            query.preload(item.relation as any, item.callback)
          }
        })
      }

      // handle columns
      if (columns && columns?.length) query.select(columns)

      // handle orders
      orders?.forEach(({ col, drec = 'asc' }) => query.orderBy(col, drec))

      // case debug (return SQL)
      if (debug) return { bool: true, dta: query.toSQL().toNative() }

      // query only
      if (isQuery) return { bool: true, dta: query }

      // fetch all rows and/or paginate
      if (paginate?.limit) {
        const result = await this.paginateQuery({
          query,
          page: paginate.page,
          limit: paginate.limit,
        })
        return result.data && result.pagination
          ? { bool: true, dta: result }
          : { bool: false, dta: null }
      } else {
        const rows = await query.exec()
        return { bool: true, dta: rows }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `DB_CATCH_ERROR`)
      return { bool: false, dta: `DB_CATCH_ERROR : ${errorMessage}` }
    }
  }

  static paginateQuery = async ({
    query,
    page = 1,
    limit = 10,
  }: {
    query: ReturnType<LucidModel['query']>
    page: number
    limit: number
  }): Promise<any> => {
    try {
      const offset = (page - 1) * limit
      const queryToCount = query.clone()
      const allRows = await queryToCount.exec()

      const totalItems = allRows.length
      const totalPages = Math.ceil(totalItems / limit)
      const currentPage = page

      const rows = await query.clone().offset(offset).limit(limit).exec()

      return {
        data: rows,
        pagination: {
          totalItems,
          totalPages,
          currentPage,
          perPage: limit,
          hasMorePages: currentPage < totalPages,
        },
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error({ err: error }, `DB_PAGINATION_ERROR`)
      return {
        data: [],
        pagination: {
          totalItems: 0,
          totalPages: 0,
          currentPage: 1,
          perPage: limit,
        },
        error: `DB_PAGINATION_ERROR : ${errorMessage}`,
      }
    }
  }
}
