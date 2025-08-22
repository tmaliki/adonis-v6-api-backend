import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { JsonResponse } from '#utils/json_response'
// import { DbHelper } from '#utils/db_helper'
// import { TokenService } from '#services/token_service'
// import { CommonService } from '#services/common_service'
// import { AdminService } from '#services/admin_service'
// import { JwtService } from '#services/jwt_service'
import Admin from '#models/admin'
import { constants } from '#config/constants'

const LOG_MESSAGES = constants.LOG_MESSAGES

export default class ApiAuthAdminsController {
  login = async (ctx: HttpContext) => {
    try {
      const { request, auth } = ctx
      const { email, password } = request.only(['email', 'password'])

      // const admin = await Admin.verifyCredentials(email, password)
      // const token = await Admin.accessTokens.create(admin)
      // const token = await auth.use('admin').generate(admin)
      // const token = await auth.use('admin').attempt(email, password)

      // Étape 1: Trouver l'admin par email
      const adminZ = await Admin.findByOrFail('email', email)
      if (!adminZ) {
        throw new Error('Admin not found')
      }

      // // Étape 2: Vérifier le mot de passe avec la bonne syntaxe
      // const isPasswordValid = await hash.verify(admin.password, password)
      // if (!isPasswordValid) {
      //   throw new Error('Invalid password')
      // }

      // const admin = await Admin.verifyCredentials(email, password)

      // Étape 3: Générer le token
      const token = await Admin.accessTokens.create(adminZ)
      // const token = await ctx.auth.use('admin').generate(adminZ)

      return JsonResponse.success({
        ctx,
        data: {
          admin: adminZ,
          token: {
            type: 'Bearer',
            token: token.value?.release(),
          },
        },
        status: 200,
        msg: LOG_MESSAGES.AUTH.message.successful,
      })
    } catch (error) {
      return JsonResponse.error({
        ctx,
        msg: {
          title: LOG_MESSAGES.AUTH.message.failed,
          detail: LOG_MESSAGES.AUTH.message.emailPwd,
          debug: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : String(error),
        },
        status: 401,
      })
    }
  }
}
