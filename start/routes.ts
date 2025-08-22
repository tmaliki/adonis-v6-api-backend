/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
| The routes file is used for defining the HTTP routes.
*/
import router from '@adonisjs/core/services/router'
import { JsonResponse } from '#utils/json_response'

router.get('/', async () => {
  return { message: 'Hello world !' }
})

// download uploads api routes
import '#start/api/download_uploads'

// globals api routes
import '#start/api/globals'

// backoffs api routes
import '#start/api/backoffs/index'

// teachers api routes
import '#start/api/teachers/index'

// students api routes
import '#start/api/students/index'

// incorrect url error
router.any('*', async (ctx) => {
  return await JsonResponse.error({
    ctx,
    msg: 'Oops !!! Incorrect URL !',
    addUrl: true,
  })
})
