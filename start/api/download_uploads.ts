import router from '@adonisjs/core/services/router'

// download or preview routes
router
  .group(() => {
    router
      .get(
        '/:zero?/:one?/:two?/:three?/:four?/:five?/:six?/:seven?/:eight?/:nine?',
        '#controllers/webs_controller.getDownloadOrPreviewStorageFile'
      )
      .as('download.or.preview')
  })
  .prefix('api/download-or-preview')

// uploads images routes
router
  .group(() => {
    router.post('/ckeditor-image', '#controllers/webs_controller.uploadCKEditorImage')
  })
  .prefix('api/uploads')
