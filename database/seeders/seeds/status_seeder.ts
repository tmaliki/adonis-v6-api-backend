import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Status from '#models/status'

export default class StatusSeeder extends BaseSeeder {
  async run() {
    // category = ['default', 'enrollment']

    const dataInsert = [
      {
        // id: 1,
        label: `Inscrit`,
        key: `enrolled`,
        description: `L'utilisateur a finalisé son inscription et est activement enregistré.`,
        category: 'enrollment' as 'enrollment',
      },
      {
        // id: 2,
        label: `En attente`,
        key: `pending`,
        description: `L'utilisateur a commencé le processus d'inscription mais ne l'a pas encore terminé.`,
        category: 'enrollment' as 'enrollment',
      },
      {
        // id: 3,
        label: `Annulé`,
        key: `cancelled`,
        description: `L'inscription de l'utilisateur a été annulée, soit par l'utilisateur, soit par un administrateur.`,
        category: 'enrollment' as 'enrollment',
      },
    ]

    for (const item of dataInsert) {
      await Status.updateOrCreate(
        { label: item.label, key: item.key, category: item.category },
        item
      )
    }

    console.log('***** StatusSeeder Executed *****')
  }
}
