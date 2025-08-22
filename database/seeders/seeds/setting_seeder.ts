import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import Setting from '#models/setting'

export default class SettingSeeder extends BaseSeeder {
  async run() {
    const dataInsert = {
      backConfig: {
        baseUrl: 'http://localhost:3335',
      },
      frontConfig: {
        baseUrl: 'http://localhost:3000',
        adminBaseUrl: 'http://localhost:3001',
        teacherBaseUrl: 'http://localhost:3002',
        studentBaseUrl: 'http://localhost:3003',
      },
      mailAddress: {
        test: { value: 'maliki.tcherou1@gmail.com', name: 'Test Email' },
        noreply: { value: 'noreply@madoct-clients.com', name: 'No Reply' },
      },
      passwordAttemptLimit: 3,
    }

    // truncate the table
    await db.rawQuery('SET FOREIGN_KEY_CHECKS = 0')
    await Setting.truncate()
    await db.rawQuery('SET FOREIGN_KEY_CHECKS = 1')

    // insert item in the table
    await Setting.create(dataInsert)

    console.log('***** SettingSeeder Executed *****')
  }
}
