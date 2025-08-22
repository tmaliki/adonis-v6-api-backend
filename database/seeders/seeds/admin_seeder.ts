import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Admin from '#models/admin'

export default class AdminSeeder extends BaseSeeder {
  async run() {
    const dataInsert = [
      {
        roleId: 3,
        first_name: 'Test1',
        last_name: 'TEST',
        username: 't1.test',
        email: 'test1@test.com',
        password: 't1@test',
        callPrefixId: 152,
        city_name: 'Rabat',
        phone_number: '0707070707',
        civilityId: 2,
        actived: false,
      },
      {
        roleId: 4,
        first_name: 'Test2',
        last_name: 'TEST',
        username: 't2.test',
        email: 'test2@test.com',
        password: 't2@test',
        callPrefixId: 152,
        city_name: 'Tanger',
        phone_number: '0707070707',
        civilityId: 1,
        actived: false,
      },
      {
        roleId: 5,
        first_name: 'Root',
        last_name: 'DEMO',
        username: 'root',
        email: 'root@demo.dev',
        password: 't3@test',
        callPrefixId: 152,
        city_name: 'Casablanca',
        phone_number: '0707070707',
        civilityId: 1,
      },
    ]

    for (const item of dataInsert) {
      await Admin.updateOrCreate({ username: item.username, email: item.email }, item)
    }

    console.log('***** AdminSeeder Executed *****')
  }
}
