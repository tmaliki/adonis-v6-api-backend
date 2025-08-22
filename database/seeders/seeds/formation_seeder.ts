import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Formation from '#models/formation'
import { TextFormatter } from '#utils/text_formatter'

export default class FormationSeeder extends BaseSeeder {
  async run() {
    const dataInsert = [
      {
        // id: 1,
        typeId: 1,
        cycleId: 1,
        name: `Qualification`,
        slug: TextFormatter.getTextSlug(`Qualification`),
        sigle: `Q`,
        label: `Diplôme Qualification DQ`,
        label_abbr: `DQ`,
        description: ``,
        durationValue: 1,
        unitId: 9,
      },
      {
        // id: 2,
        typeId: 1,
        cycleId: 1,
        name: `Technicien`,
        slug: TextFormatter.getTextSlug(`Technicien`),
        sigle: `T`,
        label: `Diplôme Technicien (Niveau BAC)`,
        label_abbr: `DT`,
        description: ``,
        durationValue: 2,
        unitId: 9,
      },
      {
        // id: 3,
        typeId: 1,
        cycleId: 1,
        name: `Technicien Spécialisé`,
        slug: TextFormatter.getTextSlug(`Technicien Spécialisé`),
        sigle: `TS`,
        label: `Diplôme Technicien Spécialisé – DTS – (BAC+2)`,
        label_abbr: `DTS`,
        description: ``,
        durationValue: 2,
        unitId: 9,
      },
      {
        // id: 4,
        typeId: 1,
        cycleId: 2,
        name: `Bachelor Européen`,
        slug: TextFormatter.getTextSlug(`Bachelor Européen`),
        sigle: `BE`,
        label: `Bachelor Européen Lic. Pro. (DEES) (BAC+3)`,
        label_abbr: `BE`,
        description: ``,
        durationValue: 1,
        unitId: 9,
      },
      {
        // id: 5,
        typeId: 1,
        cycleId: 2,
        name: `Mastère Europée`,
        slug: TextFormatter.getTextSlug(`Mastère Europée`),
        sigle: `ME`,
        label: `Mastère Européen (Bac+5)`,
        label_abbr: `ME`,
        description: ``,
        durationValue: 2,
        unitId: 9,
      },
      {
        // id: 6,
        typeId: 1,
        cycleId: 2,
        name: `Mastère of Business Administration`,
        slug: TextFormatter.getTextSlug(`Mastère of Business Administration`),
        sigle: `MBA`,
        label: `Mastère of Business Administration – MBA (Bac+5)`,
        label_abbr: `MBA`,
        description: ``,
        durationValue: 2,
        unitId: 9,
      },
      {
        // id: 7,
        typeId: 1,
        cycleId: 2,
        name: `Doctorate of Business Administration`,
        slug: TextFormatter.getTextSlug(`Doctorate of Business Administration`),
        sigle: `DBA`,
        label: `Doctorate of Business Administration – DBA`,
        label_abbr: `DBA`,
        description: ``,
        durationValue: 3,
        unitId: 9,
      },
    ]

    for (const item of dataInsert) {
      await Formation.updateOrCreate({ name: item.name, slug: item.slug }, item)
    }

    console.log('***** FormationSeeder Executed *****')
  }
}
