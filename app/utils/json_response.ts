import type { HttpContext } from '@adonisjs/core/http'

export interface JsonResponseOptions {
  ctx: HttpContext
  type?: 'success' | 'error' | 'warning'
  data?: any
  status?: number
  msg?: any
  addUrl?: boolean
}

export class JsonResponse {
  // Alias pour success
  static success(options: Omit<JsonResponseOptions, 'type'>) {
    return this.send({ ...options, type: 'success', status: options.status ?? 200 })
  }

  // Alias pour error
  static error(options: Omit<JsonResponseOptions, 'type'>) {
    return this.send({ ...options, type: 'error', status: options.status ?? 404 })
  }

  // Alias pour warning
  static warning(options: Omit<JsonResponseOptions, 'type'>) {
    return this.send({ ...options, type: 'warning', status: options.status ?? 403 })
  }

  // Méthode générique
  static async send({
    ctx,
    type = 'success',
    data = null,
    status = 200,
    msg = null,
    addUrl = false,
  }: JsonResponseOptions) {
    const { request, response } = ctx

    const body: Record<string, any> = {
      type,
      status,
      message: msg,
      result: data,
    }

    if (addUrl) {
      body.path = {
        url: request.url(),
        originalUrl: request.completeUrl(),
      }
    }

    return response.status(status).json(body)
  }
}
