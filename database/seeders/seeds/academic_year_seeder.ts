import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import AcademicYear from '#models/academic_year'

export default class AcademicYearSeeder extends BaseSeeder {
  async run() {
    const startYear = 1990
    const currentYear = DateTime.now().year + 1
    const dataInsert: Partial<AcademicYear>[] = []

    for (let year = startYear; year < currentYear; year++) {
      const startDate = DateTime.fromISO(`${year}-10-01`)
      const endDate = DateTime.fromISO(`${year + 1}-07-31`)
      const enrolledStartDate = DateTime.fromISO(`${year}-08-01`)
      const enrolledEndDate = DateTime.fromISO(`${year + 1}-12-31`)
      const item = {
        startDate,
        endDate,
        enrolledStartDate,
        enrolledEndDate,
        dateLabel: `${startDate.toISODate()} / ${endDate.toISODate()}`,
        yearLabel: `${year}-${year + 1}`,
      }
      dataInsert.push(item)
    }

    await AcademicYear.createMany(dataInsert)

    console.log('***** AcademicYearSeeder Executed *****')
  }
}
