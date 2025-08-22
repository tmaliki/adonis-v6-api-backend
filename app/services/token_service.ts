import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
// import { LucidRow } from '@adonisjs/lucid/types/model'
import { JsonResponse } from '#utils/json_response'
import { CommonService } from '#services/common_service'
import { constants } from '#config/constants'

const LOG_MESSAGES = constants.LOG_MESSAGES

export interface InsertParams {
  user: any
  token: string
  guard: string
  isRevoked?: boolean
}

export interface FindParams {
  user: any
  token: string
  guard?: string | null
  isRevoked?: boolean | null
  userId?: number | null
}

export interface UpdateColParams {
  row: any
  col: string
  val: any
}

export interface DoRevokedParams {
  row: any
  val?: boolean
}

export interface DeleteParams {
  key: string
  val: string
}

export interface VerifyParams {
  ctx: HttpContext
  guard?: string
  action?: 'api' | 'logout' | 'refresh' | null
}

export class TokenService {
  // insert/create line in tokens
  static insert = async ({
    user,
    token,
    guard,
    isRevoked = false,
  }: InsertParams): Promise<void> => {
    try {
      await user.tokens().create({
        guard: guard,
        user_id: user.id,
        token: token,
        is_revoked: isRevoked,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      throw new Error(`TokenService insert error : ${errorMessage}`)
    }
  }

  // find line in tokens
  static find = async ({
    user,
    token,
    guard = null,
    isRevoked = null,
    userId = null,
  }: FindParams) => {
    try {
      const query = user.tokens().where('token', token)

      if (guard !== null) {
        query.where('guard', guard)
      }

      if (userId !== null) {
        query.where('user_id', userId)
      }

      if (isRevoked !== null) {
        query.where('is_revoked', isRevoked)
      }

      return await query.first()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`TokenService find error : ${errorMessage}`)
      return null
    }
  }

  // update column in tokens
  static updateCol = async ({ row, col, val }: UpdateColParams) => {
    try {
      ;(row as any)[col] = val
      await row.save()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      throw new Error(`TokenService update error : ${errorMessage}`)
    }
  }

  // do revoked token in tokens
  static doRevoked = async ({ row, val = true }: DoRevokedParams) => {
    try {
      row.is_revoked = val
      await row.save()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      throw new Error(`TokenService doRevoked error : ${errorMessage}`)
    }
  }

  // delete line in tokens
  static delete = async ({ key, val }: DeleteParams) => {
    try {
      const deleted = await db.from('tokens').where(key, val).delete()
      return deleted.length > 0
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`TokenService delete error : ${errorMessage}`)
      return false
    }
  }

  // revoke all valid tokens for a given user or all tokens in the table
  static revokeAll = async (user: { id: number } | null = null) => {
    try {
      const query = db.from('tokens').where('is_revoked', false)
      if (user) query.where('user_id', user.id)

      const affectedRows = await query.update({ is_revoked: true })
      return affectedRows.length > 0
    } catch (error) {
      // throw new Error("TokenService revokeAll error : " + error.message);
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`TokenService revokeAll error : ${errorMessage}`)
      return false
    }
  }

  // Token verification by guard
  static verify = async ({ ctx, guard = 'default', action = null }: VerifyParams) => {
    try {
      const { request, auth } = ctx as HttpContext & { auth: any }
      const user = await auth.use(guard).authenticate()

      const authHeader = request.header('Authorization')
      if (!authHeader) {
        await JsonResponse.error({
          ctx,
          msg: {
            title: LOG_MESSAGES.GLOBAL.unauthorizedTitle,
            detail: LOG_MESSAGES.GLOBAL.emptyTokenError,
          },
          status: 401,
        })
        return false
      }

      const token = authHeader.replace('Bearer ', '').trim()
      const tokenRow = await this.find({
        user,
        token,
        guard,
        isRevoked: false,
      })

      if (!tokenRow) {
        await JsonResponse.error({
          ctx,
          msg: {
            title: LOG_MESSAGES.GLOBAL.unauthorizedTitle,
            detail: LOG_MESSAGES.GLOBAL.invalidTokenError,
          },
          status: 401,
        })
        return false
      }

      if (action === 'api') return { bool: true, user }

      if (action === 'logout') {
        await this.doRevoked({ row: tokenRow })
        await CommonService.updateColAt({ row: user, col: 'last_activity_at' })
      }

      if (action === 'refresh') {
        const newToken = await auth.use(guard).generate(user)
        await this.updateCol({
          row: tokenRow,
          col: 'token',
          val: newToken.token,
        })
        await CommonService.updateColAt({ row: user, col: 'last_activity_at' })
        return { bool: true, user, token: newToken }
      }

      return true
    } catch (error) {
      throw new Error('TokenService verify error : ' + error)
      // const errorMessage = error instanceof Error ? error.message : String(error)
      // await JsonResponse.error({
      //   ctx,
      //   msg: {
      //     title: LOG_MESSAGES.GLOBAL.unauthorizedTitle,
      //     detail: LOG_MESSAGES.GLOBAL.unauthorizedTokensError,
      //     debug: errorMessage,
      //   },
      //   status: 401,
      // })
      // return false
    }
  }
}
