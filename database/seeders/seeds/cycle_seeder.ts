import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cycle from '#models/cycle'
import { TextFormatter } from '#utils/text_formatter'

export default class CycleSeeder extends BaseSeeder {
  async run() {
    const dataInsert = [
      {
        // id: 1,
        levelId: 3,
        name: `Cycle Initial`,
        slug: TextFormatter.getTextSlug(`Cycle Initial`),
        description: `Formation de base accessible après le bac, pour acquérir les premières compétences d’un domaine.`,
      },
      {
        // id: 2,
        levelId: 3,
        name: `Cycle Supérieur`,
        slug: TextFormatter.getTextSlug(`Cycle Supérieur`),
        description: `Formation avancée destinée à approfondir ses connaissances après un bac+2 ou équivalent.`,
      },
    ]

    for (const item of dataInsert) {
      await Cycle.updateOrCreate({ levelId: item.levelId, name: item.name, slug: item.slug }, item)
    }

    console.log('***** CycleSeeder Executed *****')
  }
}
