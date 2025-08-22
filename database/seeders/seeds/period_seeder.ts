import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Period from '#models/period'
import { TextFormatter } from '#utils/text_formatter'

export default class PeriodSeeder extends BaseSeeder {
  async run() {
    const dataInsert = [
      {
        // id: 1,
        parentId: null,
        typeId: 9,
        name: `Première Année`,
        slug: TextFormatter.getTextSlug(`Première Année`),
        abbr: `1ère A`,
        description: ``,
        durationValue: 1,
        unitId: 9,
      },
      {
        // id: 2,
        parentId: null,
        typeId: 9,
        name: `Deuxième Année`,
        slug: TextFormatter.getTextSlug(`Deuxième Année`),
        abbr: `2ème A`,
        description: ``,
        durationValue: 2,
        unitId: 9,
      },
      {
        // id: 3,
        parentId: null,
        typeId: 9,
        name: `Troisième Année`,
        slug: TextFormatter.getTextSlug(`Troisième Année`),
        abbr: `3ème A`,
        description: ``,
        durationValue: 3,
        unitId: 9,
      },
      {
        // id: 4,
        parentId: null,
        typeId: 9,
        name: `Quatrième Année`,
        slug: TextFormatter.getTextSlug(`Quatrième Année`),
        abbr: `4ème A`,
        description: ``,
        durationValue: 4,
        unitId: 9,
      },
      {
        // id: 5,
        parentId: null,
        typeId: 9,
        name: `Cinquième Année`,
        slug: TextFormatter.getTextSlug(`Cinquième Année`),
        abbr: `5ème A`,
        description: ``,
        durationValue: 5,
        unitId: 9,
      },
      {
        // id: 6,
        parentId: 1,
        typeId: 8,
        name: `Semestre 1`,
        slug: TextFormatter.getTextSlug(`Semestre 1`),
        abbr: `S1`,
        description: ``,
        durationValue: 5,
        unitId: 6,
      },
      {
        // id: 7,
        parentId: 1,
        typeId: 8,
        name: `Semestre 2`,
        slug: TextFormatter.getTextSlug(`Semestre 2`),
        abbr: `S2`,
        description: ``,
        durationValue: 5,
        unitId: 6,
      },
      {
        // id: 8,
        parentId: 2,
        typeId: 8,
        name: `Semestre 3`,
        slug: TextFormatter.getTextSlug(`Semestre 3`),
        abbr: `S3`,
        description: ``,
        durationValue: 5,
        unitId: 6,
      },
      {
        // id: 9,
        parentId: 2,
        typeId: 8,
        name: `Semestre 4`,
        slug: TextFormatter.getTextSlug(`Semestre 4`),
        abbr: `S4`,
        description: ``,
        durationValue: 5,
        unitId: 6,
      },
      {
        // id: 10,
        parentId: 3,
        typeId: 8,
        name: `Semestre 5`,
        slug: TextFormatter.getTextSlug(`Semestre 5`),
        abbr: `S5`,
        description: ``,
        durationValue: 5,
        unitId: 6,
      },
      {
        // id: 11,
        parentId: 3,
        typeId: 8,
        name: `Semestre 6`,
        slug: TextFormatter.getTextSlug(`Semestre 6`),
        abbr: `S6`,
        description: ``,
        durationValue: 5,
        unitId: 6,
      },
    ]

    for (const item of dataInsert) {
      await Period.updateOrCreate({ name: item.name, slug: item.slug }, item)
    }

    console.log('***** PeriodSeeder Executed *****')
  }
}
