import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'
import FileService from '#services/file_service'
import { JsonResponse } from '#utils/json_response'
import { constants } from '#config/constants'

const FILE_PATHS = constants.FILE_PATHS

export default class WebsController {
  /**
   * Téléversement d'une image pour CKEditor
   * @param {object} ctx - Contexte de la requête
   * @param {object} ctx.request - Requête HTTP
   * @param {object} ctx.response - Réponse HTTP
   * @returns
   */
  async uploadCKEditorImage({ request, response }: HttpContext) {
    try {
      const image = request.file('upload', {
        extnames: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
        size: '2mb', // Limite si besoin
      })

      if (!image) {
        return response.status(400).json({ error: 'Aucune image fournie' })
      }

      let path = FILE_PATHS.UPLOADS.OTHER
      let prefix = 'other_img'

      const { inPath } = request.qs()

      if (inPath === 'event') {
        path = FILE_PATHS.UPLOADS.EVENTS.IMAGES
        prefix = 'event_img'
      } else if (inPath === 'article') {
        path = FILE_PATHS.UPLOADS.ARTICLES.IMAGES
        prefix = 'article_img'
      }

      const result = await FileService.saveFile({
        file: image,
        path,
        prefix,
      })

      if (result?.error) {
        return response.status(500).json({ error: result.error })
      }

      return response.status(200).json({
        url: result?.fullPath,
      })
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }

  /**
   * Télécharger ou prévisualiser un fichier depuis le stockage
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Params} ctx.params
   * @returns
   */
  async getDownloadOrPreviewStorageFile(ctx: HttpContext) {
    try {
      const { request, response, params } = ctx
      const paths = Object.values(params).filter(Boolean).join('/')
      const fileExists = await drive.use('local').exists(paths)

      if (!fileExists) {
        await JsonResponse.error({ ctx, msg: 'Fichier introuvable', addUrl: true })
        return false
      }

      const storagePath = app.makePath(`${FILE_PATHS.APP}/${paths}`)

      if ('prev' in request.qs()) {
        const mimeType = FileService.getMimeType(storagePath)
        response.header('Content-Type', mimeType)
        return response.download(storagePath)
      }

      return response.attachment(storagePath)
    } catch (error: any) {
      await JsonResponse.error({
        ctx,
        msg: {
          title: 'Echec de récupération du fichier',
          detail: error.message,
        },
        status: 500,
      })
      return false
    }
  }
}
