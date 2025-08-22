import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import Society from '#models/society'

export default class SocietySeeder extends BaseSeeder {
  async run() {
    const dataInsert = {
      name: 'MIAGE Casa',
      acronym: 'MIAGE Casa',
      email: 'contact@groupemiage.net',
      location: '64 Rue Allal Ben Abdellah, Casablanca 20000',
      seat: 'Casablanca - Maroc',
      website: 'www.groupemiage.net',
      call_prefix_id: 152,
      phone_number: '522 27 96 00',
      social_medias: [
        {
          platform: 'Facebook',
          key: 'facebook',
          icon: 'fab fa-facebook-f',
          url: 'https://web.facebook.com/gmiage/about',
        },
        {
          platform: 'LinkedIn',
          key: 'linkedin',
          icon: 'fab fa-linkedin-in',
          url: 'https://www.linkedin.com/school/miage-casa-casablanca/posts/',
        },
        {
          platform: 'Youtube',
          key: 'youtube',
          icon: 'fab fa-youtube',
          url: 'https://www.youtube.com/@GroupeMIAGE',
        },
      ],
    }

    // truncate the table
    await db.rawQuery('SET FOREIGN_KEY_CHECKS = 0')
    await Society.truncate()
    await db.rawQuery('SET FOREIGN_KEY_CHECKS = 1')

    // insert item in the table
    await Society.create(dataInsert)

    console.log('***** SocietySeeder Executed *****')
  }
}
