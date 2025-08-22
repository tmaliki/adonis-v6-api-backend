import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/society', '#controllers/api/globals_controller.findSociety')
    router.get('/setting', '#controllers/api/globals_controller.findSetting')
    router.get('/civilities', '#controllers/api/globals_controller.getCivilities')
    router.get('/currencies', '#controllers/api/globals_controller.getCurrencies')
    router.get('/countries', '#controllers/api/globals_controller.getCountries')
    router.get(
      '/countries/load-options',
      '#controllers/api/globals_controller.getCountriesLoadOptions'
    )
    router.get('/cities', '#controllers/api/globals_controller.getCities')
  })
  .prefix('/api/globals')
