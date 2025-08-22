import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Civility from '#models/civility'
import { TextFormatter } from '#utils/text_formatter'

export default class CivilitySeeder extends BaseSeeder {
  async run() {
    const dataInsert = [
      {
        name: 'Homme',
        slug: TextFormatter.getTextSlug('Homme'),
        title: 'Monsieur',
        title_abbr: 'M.',
        sex: 'Masculin',
        sex_abbr: 'M',
        description: 'Monsieur, est le titre de civilité donné aux hommes.',
      },
      {
        name: 'Femme',
        slug: TextFormatter.getTextSlug('Femme'),
        title: 'Madame',
        title_abbr: 'Mme',
        sex: 'Féminin',
        sex_abbr: 'F',
        description: 'Madame, est le titre de civilité donné aux femmes.',
      },
    ]

    for (const item of dataInsert) {
      await Civility.updateOrCreate({ name: item.name, slug: item.slug }, item)
    }

    console.log('***** CivilitySeeder Executed *****')
  }
}
