import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Field from '#models/field'
import { TextFormatter } from '#utils/text_formatter'

export default class FieldSeeder extends BaseSeeder {
  async run() {
    const dataInsert = [
      {
        // id: 1,
        formationId: 2,
        name: `Infographiste`,
        slug: TextFormatter.getTextSlug(`Infographiste`),
        sigle: `I`,
        label: `Technicien en Infographiste (Niveau Bac)`,
        label_abbr: `T-I`,
        description: `Formation orientée vers la création graphique et visuelle, incluant le design numérique, la retouche d’images, la mise en page et la conception d’éléments visuels pour le web et l’imprimé.`,
        durationValue: 4,
        unitId: 8,
      },
      {
        // id: 2,
        formationId: 2,
        name: `Gestion Informatisée`,
        slug: TextFormatter.getTextSlug(`Gestion Informatisée`),
        sigle: `GI`,
        label: `Technicien en Gestion Informatisée (Niveau Bac)`,
        label_abbr: `T-GI`,
        description: `Formation axée sur l’utilisation des outils informatiques pour la gestion administrative, comptable et commerciale d’une organisation.`,
        durationValue: 4,
        unitId: 8,
      },
      {
        // id: 3,
        formationId: 3,
        name: `Développement Informatique`,
        slug: TextFormatter.getTextSlug(`Développement Informatique`),
        sigle: `DI`,
        label: `Technicien Spécialisé Développement Informatique`,
        label_abbr: `TS-DI`,
        description: `Formation spécialisée dans la conception, le développement et la maintenance d’applications logicielles, web et mobiles.`,
        durationValue: 4,
        unitId: 8,
      },
      {
        // id: 4,
        formationId: 3,
        name: `Systèmes et Réseaux Informatiques`,
        slug: TextFormatter.getTextSlug(`Systèmes et Réseaux Informatiques`),
        sigle: `SRI`,
        label: `Technicien Spécialisé Systèmes et Réseaux Informatiques`,
        label_abbr: `TS-SRI`,
        description: `Formation dédiée à l’installation, la configuration, l’administration et la sécurisation des systèmes informatiques et réseaux d’entreprise.`,
        durationValue: 4,
        unitId: 8,
      },
      {
        // id: 5,
        formationId: 3,
        name: `Financier Comptable`,
        slug: TextFormatter.getTextSlug(`Financier Comptable`),
        sigle: `FC`,
        label: `Technicien Spécialisé Financier Comptable`,
        label_abbr: `TS-FC`,
        description: `Formation orientée vers la gestion financière, la comptabilité, l’analyse budgétaire et la fiscalité en entreprise.`,
        durationValue: 4,
        unitId: 8,
      },
      {
        // id: 6,
        formationId: 3,
        name: `Gestion des Entreprises`,
        slug: TextFormatter.getTextSlug(`Gestion des Entreprises`),
        sigle: `GE`,
        label: `Technicien Spécialisé Gestion des Entreprises`,
        label_abbr: `TS-GE`,
        description: `Formation polyvalente couvrant la gestion administrative, financière, commerciale et stratégique des organisations.`,
        durationValue: 4,
        unitId: 8,
      },
      {
        // id: 7,
        formationId: 3,
        name: `Gestion en Transport et Logistique`,
        slug: TextFormatter.getTextSlug(`Gestion en Transport et Logistique`),
        sigle: `GTL`,
        label: `Technicien Spécialisé Gestion en Transport et Logistique`,
        label_abbr: `TS-GTL`,
        description: `Formation spécialisée dans la planification, la gestion et l’optimisation des flux logistiques et des opérations de transport.`,
        durationValue: 4,
        unitId: 8,
      },
      {
        // id: 8,
        formationId: 3,
        name: `Développement Multimédia`,
        slug: TextFormatter.getTextSlug(`Développement Multimédia`),
        sigle: `DM`,
        label: `Technicien Spécialisé Développement Multimédia`,
        label_abbr: `TS-DM`,
        description: `Formation orientée vers la conception et la réalisation de contenus interactifs, multimédias et audiovisuels pour le web, les applications et la communication digitale.`,
        durationValue: 4,
        unitId: 8,
      },
    ]

    for (const item of dataInsert) {
      await Field.updateOrCreate(
        { formationId: item.formationId, name: item.name, slug: item.slug },
        item
      )
    }

    console.log('***** FieldSeeder Executed *****')
  }
}
