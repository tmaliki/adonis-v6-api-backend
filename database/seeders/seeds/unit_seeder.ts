import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Unit from '#models/unit'

export default class UnitSeeder extends BaseSeeder {
  async run() {
    // category = ['default', 'duration']

    const dataInsert = [
      {
        // id: 1,
        label: `Seconde`,
        key: `seconde`,
        description: `Unité de temps équivalente à une seconde. Utilisée pour les durées très courtes.`,
        category: 'duration' as 'duration',
      },
      {
        // id: 2,
        label: `Minute`,
        key: `minute`,
        description: `Unité de temps équivalente à 60 secondes. Utilisée pour des durées courtes.`,
        category: 'duration' as 'duration',
      },
      {
        // id: 3,
        label: `Heure`,
        key: `hour`,
        description: `Unité de temps équivalente à 60 minutes. Utilisée pour mesurer des périodes modérées.`,
        category: 'duration' as 'duration',
      },
      {
        // id: 4,
        label: `Jour`,
        key: `day`,
        description: `Unité de temps correspondant à 24 heures. Représente une journée complète.`,
        category: 'duration' as 'duration',
      },
      {
        // id: 5,
        label: `Semaine`,
        key: `week`,
        description: `Unité de temps équivalente à 7 jours. Fréquemment utilisée pour des cycles hebdomadaires.`,
        category: 'duration' as 'duration',
      },
      {
        // id: 6,
        label: `Mois`,
        key: `month`,
        description: `Unité de temps correspondant à un mois calendaire. Utilisée pour les échéances mensuelles.`,
        category: 'duration' as 'duration',
      },
      {
        // id: 7,
        label: `Trimestre`,
        key: `trimester`,
        description: `Unité de temps équivalente à trois mois. Souvent utilisée dans les contextes scolaires ou financiers.`,
        category: 'duration' as 'duration',
      },
      {
        // id: 8,
        label: `Semestre`,
        key: `semester`,
        description: `Unité de temps équivalente à six mois. Représente généralement la moitié d'une année.`,
        category: 'duration' as 'duration',
      },
      {
        // id: 9,
        label: `Année`,
        key: `year`,
        description: `Unité de temps correspondant à 12 mois ou 365 jours. Utilisée pour les périodes longues.`,
        category: 'duration' as 'duration',
      },
    ]

    for (const item of dataInsert) {
      await Unit.updateOrCreate({ label: item.label, key: item.key, category: item.category }, item)
    }

    console.log('***** UnitSeeder Executed *****')
  }
}
