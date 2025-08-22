// admin_service.ts
import { DbHelper, Keys, SelectParams, Relations, DataResult } from '#utils/db_helper'
import { MomentHelper } from '#utils/moment_helper'
import Admin from '#models/admin'

export interface AuthToken {
  type: string
  token: string
  refreshToken?: string
  authorization?: string
  admin?: AdminData | null
}

export interface AdminData {
  id: number
  uuid: string
  firstName: string
  lastName: string
  username: string
  email: string
  actived: number
  lastActivityAt: string | null
  avatarUri: string | null
}

export interface AvatarData {
  id: number | null
  uuid: string | null
  avatar: string | null
  avatarUri: string | null
}

export class AdminService {
  // admin auth data
  static authData = async (
    data: any,
    authToken: AuthToken | null = null
  ): Promise<AdminData | AuthToken | null> => {
    let adminData: AdminData | null = null

    if (data) {
      adminData = {
        id: data.id,
        uuid: data.uuid,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        actived: data.actived,
        lastActivityAt: data.lastActivityAt,
        avatarUri: data.avatarUri,
      }
    }

    if (authToken) {
      authToken.authorization = `Bearer ${authToken.token}`
      authToken.admin = adminData
      return authToken
    }

    return adminData
  }

  // admin avatar data
  static avatarData = (authUser: any): AvatarData => {
    const userData = authUser ? authUser.toJSON() : {}
    return {
      id: userData?.id || null,
      uuid: userData?.uuid || null,
      avatar: userData?.avatar || null,
      avatarUri: userData?.avatarUri || null,
    }
  }

  // is actived
  static isActived = async (keys: Keys, relations: Relations = {}): Promise<DataResult<Admin>> => {
    const { bool, dta } = await this.find({ keys, relations })
    if (bool && dta) {
      if (Number.parseInt(dta.actived as any) === 1) {
        return { bool: true, dta }
      }
      return { bool: false, dta }
    }
    return { bool: false, dta: null }
  }

  // find admin
  static find = async (options: SelectParams): Promise<DataResult<Admin>> => {
    const { keys, relations = {} } = options
    const { bool, dta } = await DbHelper.findTableRow({
      model: Admin,
      selectOpt: { keys, relations },
    })

    if (bool && dta) {
      return { bool: true, dta }
    }
    return { bool: false, dta: null }
  }

  // save last activity in admins
  static saveLastActivity = async ({ row }: { row: any }): Promise<void> => {
    try {
      row.lastActivityAt = MomentHelper.dateTimeFormat({})
      await row.save()
    } catch (error: any) {
      throw new Error('TokenService saveLastActivity error : ' + error.message)
    }
  }
}
