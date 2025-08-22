import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TeacherFactory } from '#database/factories/teacher_factory'

export default class TeacherSeeder extends BaseSeeder {
  async run() {
    await TeacherFactory.createMany(10)
    console.log('***** TeacherSeeder Executed *****')
  }
}
