import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Level from '#models/level'
import { TextFormatter } from '#utils/text_formatter'

export default class LevelSeeder extends BaseSeeder {
  async run() {
    // category = ['default', 'cycle', 'study']

    const dataInsert = [
      {
        // id: 1,
        name: `Primaire`,
        slug: TextFormatter.getTextSlug(`Primaire`),
        description: `Enseignement élémentaire, premier cycle de l'éducation nationale (de la maternelle au CM2)`,
        category: 'cycle' as 'cycle',
      },
      {
        // id: 2,
        name: `Secondaire`,
        slug: TextFormatter.getTextSlug(`Secondaire`),
        description: `Enseignement du second degré, général ou professionnel (de la 6ème à la terminale)`,
        category: 'cycle' as 'cycle',
      },
      {
        // id: 3,
        name: `Supérieur`,
        slug: TextFormatter.getTextSlug(`Supérieur`),
        description: `Enseignement supérieur, études post-bac (université, grandes écoles, etc.)`,
        category: 'cycle' as 'cycle',
      },
      {
        // id: 4,
        name: `Classe de terminale`,
        slug: TextFormatter.getTextSlug(`Classe de terminale`),
        description: `Enseignement du second degré, général ou professionnel (dernière année du secondaire)`,
        category: 'study' as 'study',
        actived: false,
      },
      {
        // id: 5,
        name: `Baccalauréat`,
        slug: TextFormatter.getTextSlug(`Baccalauréat`),
        description: `Baccalauréat, est un diplôme national sanctionnant la fin des études secondaires générales, technologiques ou professionnelles (Exemple: Baccalauréat en science, en économie en littérature, ... tec.)`,
        category: 'study' as 'study',
      },
      {
        // id: 6,
        name: `Baccalauréat + 1`,
        slug: TextFormatter.getTextSlug(`Baccalauréat + 1`),
        description: `Baccalauréat plus 1, elle représente une année d'études dans l'enseignement supérieur ou universitaire (Exemple: Première année en science, en économie, en littérature, ... tec.)`,
        category: 'study' as 'study',
      },
      {
        // id: 7,
        name: `Baccalauréat + 2`,
        slug: TextFormatter.getTextSlug(`Baccalauréat + 2`),
        description: `Baccalauréat plus 2, elle représente deux années d'études dans l'enseignement supérieur ou universitaire (Exemple: BTS, DUT, CPGE, DEUST, DEUG, ... etc.)`,
        category: 'study' as 'study',
      },
      {
        // id: 8,
        name: `Baccalauréat + 3`,
        slug: TextFormatter.getTextSlug(`Baccalauréat + 3`),
        description: `Baccalauréat plus 3 ou Licence, elle représente trois années d'études dans l'enseignement supérieur ou universitaire (Exemple: Licence générale ou fondamentale, Licence professionnelle ou spécialisé, Bachelor, BUT, ... etc.)`,
        category: 'study' as 'study',
      },
      {
        // id: 9,
        name: `Baccalauréat + 4`,
        slug: TextFormatter.getTextSlug(`Baccalauréat + 4`),
        description: `Baccalauréat plus 4 ou Master 1, elle représente quatre années d'études dans l'enseignement supérieur ou universitaire (Exemple: Master 1 générale ou fondamentale, Master 1 professionnelle ou spécialisé, BBA, MBA 1, ... etc.)`,
        category: 'study' as 'study',
      },
      {
        // id: 10,
        name: `Baccalauréat + 5`,
        slug: TextFormatter.getTextSlug(`Baccalauréat + 5`),
        description: `Baccalauréat plus 5 ou Master 2, elle représente cinq années d'études dans l'enseignement supérieur ou universitaire (Exemple: Master 2 générale ou fondamentale, Master 2 professionnelle ou spécialisé, MBA 2 ... etc.)`,
        category: 'study' as 'study',
      },
      {
        // id: 11,
        name: `Baccalauréat + 5 et plus`,
        slug: TextFormatter.getTextSlug(`Baccalauréat + 5 et plus`),
        description: `Baccalaureat plus 5 et plus, elle représente plus de cinq années d'études dans l'enseignement supérieur ou universitaire (Exemple: Doctorat, Post-doc, ... etc.)`,
        category: 'study' as 'study',
      },
      {
        // id: 12,
        name: `Cycle d'ingérieur`,
        slug: TextFormatter.getTextSlug(`Cycle d'ingérieur`),
        description: `Diplôme d'études universitaires d'ingénerie, correspond à un baccalaureat + 5`,
        category: 'study' as 'study',
      },
      {
        // id: 13,
        name: `BT`,
        slug: TextFormatter.getTextSlug(`BT`),
        description: `Brevet de Technicien, correspond à un baccalaureat`,
        category: 'study' as 'study',
      },
      {
        // id: 14,
        name: `BP`,
        slug: TextFormatter.getTextSlug(`BP`),
        description: `Brevet Professionnel, correspond à un baccalaureat`,
        category: 'study' as 'study',
      },
      {
        // id: 15,
        name: `BMA`,
        slug: TextFormatter.getTextSlug(`BMA`),
        description: `Brevet des Métiers d'Arts, correspond à un baccalaureat`,
        category: 'study' as 'study',
      },
      {
        // id: 16,
        name: `BTS`,
        slug: TextFormatter.getTextSlug(`BTS`),
        description: `Brevet de Technicien Suprérieur, correspond à un baccalaureat + 2`,
        category: 'study' as 'study',
      },
      {
        // id: 17,
        name: `DUT`,
        slug: TextFormatter.getTextSlug(`DUT`),
        description: `Diplôme Universitaire de Technologie, correspond à un baccalaureat + 2`,
        category: 'study' as 'study',
      },
      {
        // id: 18,
        name: `DEUG`,
        slug: TextFormatter.getTextSlug(`DEUG`),
        description: `Diplôme d'Études Universitaires Générales, correspond à un baccalaureat + 2`,
        category: 'study' as 'study',
      },
      {
        // id: 19,
        name: `DEUST`,
        slug: TextFormatter.getTextSlug(`DEUST`),
        description: `Diplôme d'Études Universitaires Scientifiques et Techniques, correspond à un baccalaureat + 2`,
        category: 'study' as 'study',
      },
      {
        // id: 20,
        name: `Licence`,
        slug: TextFormatter.getTextSlug(`Licence`),
        description: `Diplôme d'études supérieures/universitaires en licence, correspond à un baccalaureat + 3`,
        category: 'study' as 'study',
      },
      {
        // id: 21,
        name: `Licence professionnelle/spécialisée`,
        slug: TextFormatter.getTextSlug(`Licence professionnelle/spécialisée`),
        description: `Diplôme d'études supérieures/universitaires en licence, correspond à un baccalaureat + 3`,
        category: 'study' as 'study',
      },
      {
        // id: 22,
        name: `Bachelor`,
        slug: TextFormatter.getTextSlug(`Bachelor`),
        description: `Diplôme d'études supérieures/universitaires délivré par une université étrangère ou une école privée, correspond à un baccalaureat + 3`,
        category: 'study' as 'study',
      },
      {
        // id: 23,
        name: `Master`,
        slug: TextFormatter.getTextSlug(`Master`),
        description: `Diplôme d'études supérieures/universitaires en master, correspond à un baccalaureat + 5`,
        category: 'study' as 'study',
      },
      {
        // id: 24,
        name: `Master professionnel/spécialisé`,
        slug: TextFormatter.getTextSlug(`Master professionnel/spécialisé`),
        description: `Diplôme d'études supérieures/universitaires en master, correspond à un baccalaureat + 5`,
        category: 'study' as 'study',
      },
      {
        // id: 25,
        name: `MBA`,
        slug: TextFormatter.getTextSlug(`MBA`),
        description: `Master of Business Administration (MBA) est un diplôme d'études supérieures, correspond à un baccalaureat + 5 et plus`,
        category: 'study' as 'study',
      },
      {
        // id: 26,
        name: `Doctorat`,
        slug: TextFormatter.getTextSlug(`Doctorat`),
        description: `Diplôme d'études supérieures/universitaires doctorales, correspond à un baccalaureat + 5 et plus`,
        category: 'study' as 'study',
      },
    ]

    for (const item of dataInsert) {
      await Level.updateOrCreate(
        { name: item.name, slug: item.slug, category: item.category },
        item
      )
    }

    console.log('***** LevelSeeder Executed *****')
  }
}
