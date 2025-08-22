import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { StudentFactory } from '#database/factories/student_factory'

export default class StudentSeeder extends BaseSeeder {
  async run() {
    await StudentFactory.createMany(10)
    console.log('***** StudentSeeder Executed *****')
  }
}
