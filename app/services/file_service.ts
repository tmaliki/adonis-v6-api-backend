// file_service.ts
import fs from 'node:fs'
import pfPath from 'node:path'
import mime from 'mime-types'
import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { constants } from '#config/constants'

const baseUrl = env.get('APP_URL')
const FILE_PATHS = constants.FILE_PATHS

interface SaveFileOptions {
  file: any // Tu peux remplacer par le type `MultipartFileContract` si tu veux plus de précision
  path: string
  prefix?: string | null
  separator?: string
  root?: string
  suffix?: string | null
}

interface SaveBase64FileOptions {
  base64: string
  path: string
  prefix?: string | null
  separator?: string
  root?: string
  suffix?: string | null
}

interface DeleteFilesOptions {
  files: string | string[]
  path: string
  root?: string
}

interface DownloadOrPreviewFileOptions {
  path: string
  file?: string
  otherFile?: string | null
  isDownload?: boolean
}

export default class FileService {
  // Sauvegarder un fichier uploadé et générer son chemin
  static saveFile = async ({
    file,
    path,
    prefix = null,
    separator = '_',
    root = FILE_PATHS.APP,
    suffix = null,
  }: SaveFileOptions): Promise<{
    fileName?: string
    fullPath?: string | null
    error?: string
  } | null> => {
    try {
      if (!file) return null

      const newPrefix = prefix ? `${prefix}${separator}` : ''
      const newSuffix = suffix ? suffix : `${new Date().getTime()}`
      const fileName = `${newPrefix}${newSuffix}.${file.extname}`

      const uploadPath = app.makePath(`${root}/${path}`)
      await file.move(uploadPath, { name: fileName, overwrite: true })

      if (!file.moved()) {
        console.error("Erreur d'enregistement du fichier :", file.error())
        return { error: file.error() }
      }

      const fullPath = this.downloadOrPreviewFile({ path, file: fileName })

      return { fileName, fullPath }
    } catch (error: any) {
      console.error('Erreur dans FileService.saveFile : ', error.message)
      return { error: error.message }
    }
  }

  // Sauvegarder une image encodée en Base64
  static saveBase64File = async ({
    base64,
    path,
    prefix = null,
    separator = '_',
    root = FILE_PATHS.APP,
    suffix = null,
  }: SaveBase64FileOptions): Promise<{
    fileName?: string
    fullPath?: string | null
    error?: string
  } | null> => {
    try {
      if (!base64) return null

      const matches = base64.match(/^data:(.+);base64,(.+)$/)
      if (!matches) {
        return { error: 'Format Base64 invalide' }
      }

      const mimeType = matches[1]
      const fileBuffer = Buffer.from(matches[2], 'base64')
      const extension = mimeType.split('/')[1] || 'png'

      const newPrefix = prefix ? `${prefix}${separator}` : ''
      const newSuffix = suffix ? suffix : `${Date.now()}`
      const fileName = `${newPrefix}${newSuffix}.${extension}`

      const uploadPath = app.makePath(`${root}/${path}`)
      const fullFilePath = pfPath.join(uploadPath, fileName)

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true })
      }

      fs.writeFileSync(fullFilePath, fileBuffer)
      const fullPath = this.downloadOrPreviewFile({ path, file: fileName })

      return { fileName, fullPath }
    } catch (error: any) {
      console.error('Erreur dans FileService.saveBase64File : ', error.message)
      return { error: error.message }
    }
  }

  // Supprimer un ou plusieurs fichiers
  static deleteFiles = async ({
    files,
    path,
    root = FILE_PATHS.APP,
  }: DeleteFilesOptions): Promise<{
    deleted?: string[]
    notFound?: string[] | null
    error?: string
  }> => {
    try {
      if (!files) return { error: 'Aucun fichier à supprimer' }

      const filesArray = Array.isArray(files) ? files : [files]
      const basePath = pfPath.join(app.makePath(root), path)

      const deletedFiles: string[] = []
      const notFoundFiles: string[] = []

      for (const file of filesArray) {
        const filePath = pfPath.join(basePath, file)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
          deletedFiles.push(file)
        } else {
          notFoundFiles.push(file)
        }
      }

      return { deleted: deletedFiles, notFound: notFoundFiles.length ? notFoundFiles : null }
    } catch (error: any) {
      console.error('Erreur dans FileService.deleteFiles : ', error.message)
      return { error: error.message }
    }
  }

  // Déterminer le type MIME
  static getMimeType = (filePath: string): string => {
    return mime.lookup(filePath) || 'application/octet-stream'
  }

  // Générer l'URL de téléchargement ou prévisualisation
  static downloadOrPreviewFile = ({
    path,
    file = 'noFile',
    otherFile = null,
    isDownload = false,
  }: DownloadOrPreviewFileOptions): string | null => {
    try {
      let fileUri: string | null = null

      if (file && file !== 'noFile') {
        fileUri = `${path}/${file}`
      } else if (otherFile) {
        fileUri = `public/${otherFile}`
      }

      if (fileUri) {
        return `${baseUrl}/api/download-or-preview/${fileUri}${isDownload ? '' : '?prev=v'}`
      }

      return null
    } catch (error: any) {
      console.error('Erreur dans FileService.downloadOrPreviewFile : ', error.message)
      return null
    }
  }
}
