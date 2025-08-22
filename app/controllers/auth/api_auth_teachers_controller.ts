import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { JsonResponse } from '#utils/json_response'
import { DbHelper } from '#utils/db_helper'
import { TokenService } from '#services/token_service'
import { CommonService } from '#services/common_service'
import { AdminService } from '#services/admin_service'
import Teacher from '#models/teacher'
import { constants } from '#config/constants'

const LOG_MESSAGES = constants.LOG_MESSAGES

export default class ApiAuthTeachersController {
  /**
   * connexion/authentification d'un admin
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   * @returns
   */
  loginD = async (ctx: HttpContext) => {
    try {
      const { request, auth } = ctx as HttpContext & { auth: any }
      // const validation = await validate(
      //   request.all(),
      //   {
      //     email: 'required|email',
      //     password: 'required',
      //   },
      //   AdminValidator.messages()
      // )
      // validation des données
      // if (validation.fails()) {
      //   const err = validation.messages()
      //   return await JsonResponse.error({ ctx, msg: err[0].message, status: 400 })
      // }
      const { email, password } = request.only(['email', 'password'])
      const keys = { email: { value: email } }
      const { bool, dta } = await AdminService.find({ keys })

      // const admin = await Teacher.verifyCredentials(email, password)
      // const token = await auth.use('admin').generate(admin)

      // const admin = await Admin.findByOrFail('email', email)
      // const token = await auth.use('admin').attempt(email, password, {
      //   expiresIn: '1d',
      // })

      if (!bool || !dta) {
        return await JsonResponse.error({
          ctx,
          msg: {
            title: LOG_MESSAGES.AUTH.message.failed,
            detail: `Car, l'adresse email renseignée n'a pas de compe. Veuillez contacter un administrateur.`,
          },
          status: 403,
        })
      }

      // if (bool && dta) {
      //   if (Number.parseInt(dta.actived) !== 1) {
      //     return await JsonResponse.error({
      //       ctx,
      //       msg: {
      //         title: LOG_MESSAGES.AUTH.message.failed,
      //         detail: `Car, votre compte n'est pas activé. Veuillez contacter un administrateur.`,
      //       },
      //       status: 403,
      //     })
      //   }
      //   // continuer si le compte est activé
      //   const validPwd = await Hash.verify(password, dta.password)
      //   if (validPwd) {
      //     // const authToken = await auth.authenticator("admin").generate(dta);
      //     const authToken = await auth.authenticator('admin').attempt(email, password)
      //     if (authToken) {
      //       const token = authToken.token
      //       await TokenService.insert({ user: dta, token, guard: 'admin' })
      //       await CommonService.updateColAt({
      //         row: dta,
      //         col: 'last_activity_at',
      //       })
      //       return await JsonResponse.success({
      //         ctx,
      //         data: await AdminService.authData(dta, authToken),
      //         status: 200,
      //         msg: LOG_MESSAGES.AUTH.message.successful,
      //       })
      //     }
      //   }
      // }

      // authenticate failed
      return await JsonResponse.error({
        ctx,
        msg: {
          title: LOG_MESSAGES.AUTH.message.failed,
          detail: LOG_MESSAGES.AUTH.message.emailPwd,
        },
        status: 404,
      })
    } catch (error) {
      return JsonResponse.error({
        ctx,
        status: 500,
        msg: {
          title: LOG_MESSAGES.AUTH.message.failed,
          detail: LOG_MESSAGES.GLOBAL.serverError,
          debug: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }
}
