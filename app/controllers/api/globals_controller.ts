import type { HttpContext } from '@adonisjs/core/http'
import { JsonResponse } from '#utils/json_response'
import { DbHelper } from '#utils/db_helper'
import { constants } from '#config/constants'
import Currency from '#models/currency'
import Country from '#models/country'
import City from '#models/city'
import Civility from '#models/civility'

const LOG_MESSAGES = constants.LOG_MESSAGES

export default class GlobalsController {
  /**
   * find society
   * @param {HttpContext} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @returns
   */
  findSociety = async (ctx: HttpContext) => {
    try {
      const society = await DbHelper.findSociety()
      return JsonResponse.success({ ctx, data: society, msg: LOG_MESSAGES.GET.message.successful })
    } catch (error) {
      return JsonResponse.error({
        ctx,
        status: 500,
        msg: {
          title: LOG_MESSAGES.GET.message.failed,
          detail: LOG_MESSAGES.GLOBAL.serverError,
          debug: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }

  /**
   * find setting
   * @param {HttpContext} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @returns
   */
  findSetting = async (ctx: HttpContext) => {
    try {
      const setting = await DbHelper.findSetting()
      return JsonResponse.success({ ctx, data: setting, msg: LOG_MESSAGES.GET.message.successful })
    } catch (error) {
      return JsonResponse.error({
        ctx,
        status: 500,
        msg: {
          title: LOG_MESSAGES.GET.message.failed,
          detail: LOG_MESSAGES.GLOBAL.serverError,
          debug: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }

  /**
   * get civilities list
   * @param {HttpContext} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @returns
   */
  getCivilities = async (ctx: HttpContext) => {
    try {
      const { request } = ctx
      const { keys = {}, orders = {} } = request.qs()

      const options = {
        keys,
        orders:
          orders && Object.keys(orders).length > 0 ? orders : [{ col: 'sortOrder' }, { col: 'id' }],
        columns: ['id', 'uuid', 'name', 'slug', 'title', 'titleAbbr', 'sex', 'sexAbbr'],
      }

      const { bool, dta } = await DbHelper.getTableRows({ model: Civility, selectOpt: options })
      if (bool && dta) {
        return JsonResponse.success({ ctx, data: dta, msg: LOG_MESSAGES.GET.message.successful })
      }
    } catch (error) {
      return JsonResponse.error({
        ctx,
        status: 500,
        msg: {
          title: LOG_MESSAGES.GET.message.failed,
          detail: LOG_MESSAGES.GLOBAL.serverError,
          debug: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }

  /**
   * get currencies list
   * @param {HttpContext} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @returns
   */
  getCurrencies = async (ctx: HttpContext) => {
    try {
      const { request } = ctx
      const { keys = {}, orders = {}, paginate = {} } = request.qs()

      const options = {
        keys,
        orders:
          orders && Object.keys(orders).length > 0
            ? orders
            : [{ col: 'sortOrder' }, { col: 'name' }],
        columns: ['id', 'uuid', 'name', 'slug', 'code', 'codeNum', 'exchangeRate'],
        paginate,
      }

      const { bool, dta } = await DbHelper.getTableRows({ model: Currency, selectOpt: options })
      if (bool && dta) {
        return JsonResponse.success({ ctx, data: dta, msg: LOG_MESSAGES.GET.message.successful })
      }
    } catch (error) {
      return JsonResponse.error({
        ctx,
        status: 500,
        msg: {
          title: LOG_MESSAGES.GET.message.failed,
          detail: LOG_MESSAGES.GLOBAL.serverError,
          debug: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }

  /**
   * get countries list
   * @param {HttpContext} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @returns
   */
  getCountries = async (ctx: HttpContext) => {
    try {
      const { request } = ctx
      const { keys = {}, orders = {}, paginate = {} } = request.qs()

      const relations = {
        with: [
          {
            relation: 'cities',
            callback: (builder: any) => {
              builder
                .select('id', 'name', 'slug', 'countryId')
                .orderBy('name', 'asc')
                .orderBy('sortOrder', 'asc')
            },
          },
        ],
      }

      const options = {
        keys,
        relations,
        orders:
          orders && Object.keys(orders).length > 0
            ? orders
            : [{ col: 'sortOrder' }, { col: 'name' }],
        columns: ['id', 'uuid', 'name', 'slug', 'nationality', 'callPrefix', 'isoCode2'],
        paginate,
      }

      const { bool, dta } = await DbHelper.getTableRows({ model: Country, selectOpt: options })
      if (bool && dta) {
        return JsonResponse.success({ ctx, data: dta, msg: LOG_MESSAGES.GET.message.successful })
      }
    } catch (error) {
      return JsonResponse.error({
        ctx,
        status: 500,
        msg: {
          title: LOG_MESSAGES.GET.message.failed,
          detail: LOG_MESSAGES.GLOBAL.serverError,
          debug: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }

  /**
   * get countries load options list
   * @param {HttpContext} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @returns
   */
  getCountriesLoadOptions = async (ctx: HttpContext) => {
    try {
      const { request } = ctx
      const { key = 'name', query = '', page = 1, limit = 10 } = request.qs()

      let searchQuery = query
      if ('callPrefix' === key) {
        searchQuery = query.replace(/\D/g, '')
      }

      const options = {
        keys: { [key]: { value: `%${searchQuery}%`, condition: 'LIKE' } },
        orders: [{ col: key }],
        columns: ['id', 'name', 'nationality', 'callPrefix', 'isoCode2'],
        paginate: { page: Number.parseInt(page), limit: Number.parseInt(limit) },
      }

      const { bool, dta } = await DbHelper.getTableRows({ model: Country, selectOpt: options })
      if (bool && dta && dta.data && dta.pagination) {
        const pagination = dta.pagination
        let selectOptions = null

        if ('callPrefix' === key) {
          selectOptions = dta.data.map((item: any) => {
            return {
              label: `(+${item[key]}) ${item.iso_code2}`,
              value: item.id,
            }
          })
        } else {
          selectOptions = dta.data.map((item: any) => {
            return {
              label: item[key],
              value: item.id,
            }
          })
        }

        return JsonResponse.success({
          ctx,
          data: {
            options: selectOptions,
            hasMore: pagination.hasMorePages,
            additional: {
              page: pagination.currentPage + 1,
            },
          },
          msg: LOG_MESSAGES.GET.message.successful,
        })
      }
    } catch (error) {
      return JsonResponse.error({
        ctx,
        status: 500,
        msg: {
          title: LOG_MESSAGES.GET.message.failed,
          detail: LOG_MESSAGES.GLOBAL.serverError,
          debug: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }

  /**
   * get cities list
   * @param {HttpContext} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @returns
   */
  getCities = async (ctx: HttpContext) => {
    try {
      const { request } = ctx
      const { keys = {}, orders = {}, paginate = {} } = request.qs()

      //   const relations = {
      //     with: [
      //       {
      //         relation: 'country',
      //         callback: (builder: any) => {
      //           builder.select('id', 'uuid', 'name', 'slug', 'callPrefix', 'isoCode2')
      //         },
      //       },
      //     ],
      //   }

      const options = {
        keys,
        // relations,
        orders:
          orders && Object.keys(orders).length > 0
            ? orders
            : [{ col: 'sortOrder' }, { col: 'name' }],
        columns: ['id', 'uuid', 'countryId', 'name', 'slug'],
        paginate,
      }

      const { bool, dta } = await DbHelper.getTableRows({ model: City, selectOpt: options })
      if (bool && dta) {
        return JsonResponse.success({ ctx, data: dta, msg: LOG_MESSAGES.GET.message.successful })
      }
    } catch (error) {
      return JsonResponse.error({
        ctx,
        status: 500,
        msg: {
          title: LOG_MESSAGES.GET.message.failed,
          detail: LOG_MESSAGES.GLOBAL.serverError,
          debug: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }
}
