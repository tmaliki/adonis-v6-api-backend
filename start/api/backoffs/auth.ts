import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/login', '#controllers/auth/api_auth_admins_controller.login')
  })
  .prefix('/api/backoffs/auth')
