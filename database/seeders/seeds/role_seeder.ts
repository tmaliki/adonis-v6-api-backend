import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import { TextFormatter } from '#utils/text_formatter'

export default class RoleSeeder extends BaseSeeder {
  async run() {
    const dataInsert = [
      {
        // id: 1,
        name: `Invité`,
        slug: TextFormatter.getTextSlug(`Invité`),
        description: `Invité, peut rien faire`,
        actived: false,
      },
      {
        // id: 2,
        name: `Partenaire`,
        slug: TextFormatter.getTextSlug(`Partenaire`),
        description: `Utilisateur de l'espace partenaire, permissions d'accès limités`,
        actived: false,
      },
      {
        // id: 3,
        name: `Utilisateur`,
        slug: TextFormatter.getTextSlug(`Utilisateur`),
        description: `Utilisateur de l'espace d'administration, permissions d'accès limités`,
      },
      {
        // id: 4,
        name: `Admin`,
        slug: TextFormatter.getTextSlug(`Admin`),
        description: `Admin de l'espace d'administration, peut tout faire, possibilité de restriction`,
      },
      {
        // id: 5,
        name: `Root`,
        slug: TextFormatter.getTextSlug(`Root`),
        description: `Super admin de l'espace d'administration, peut tout faire, aucune restriction`,
        is_root_user: true,
      },
      {
        // id: 6,
        name: `Étudiant`,
        slug: TextFormatter.getTextSlug(`Étudiant`),
        description: `Utilisateur inscrit dans un programme, avec accès à ses cours, notes et documents.`,
      },
      {
        // id: 7,
        name: `Professeur`,
        slug: TextFormatter.getTextSlug(`Professeur`),
        description: `Membre du corps enseignant, responsable des cours et de l’évaluation des étudiants.`,
      },
      {
        // id: 8,
        name: `Stagiaire`,
        slug: TextFormatter.getTextSlug(`Stagiaire`),
        description: `Utilisateur en apprentissage temporaire, accès restreint aux fonctionnalités selon son rôle.`,
      },
      {
        // id: 9,
        name: `Secrétaire`,
        slug: TextFormatter.getTextSlug(`Secrétaire`),
        description: `Gère l'accueil, les dossiers administratifs et la communication interne.`,
      },
      {
        // id: 10,
        name: `Responsable Cycle Supérieur`,
        slug: TextFormatter.getTextSlug(`Responsable Cycle Supérieur`),
        description: `Responsable de la gestion académique et administrative du cycle supérieur.`,
      },
      {
        // id: 11,
        name: `Responsable Cycle Initial`,
        slug: TextFormatter.getTextSlug(`Responsable Cycle Initial`),
        description: `Supervise le cycle initial, organise les cours et suit les étudiants.`,
      },
      {
        // id: 12,
        name: `Responsable Pédagogique`,
        slug: TextFormatter.getTextSlug(`Responsable Pédagogique`),
        description: `Coordonne les activités pédagogiques, assure la qualité de l’enseignement.`,
      },
      {
        // id: 13,
        name: `Responsable des Admissions`,
        slug: TextFormatter.getTextSlug(`Responsable des Admissions`),
        description: `Gère les candidatures, les inscriptions et les relations avec les nouveaux étudiants.`,
      },
      {
        // id: 14,
        name: `Responsable de la Scolarité`,
        slug: TextFormatter.getTextSlug(`Responsable de la Scolarité`),
        description: `Assure le suivi administratif des étudiants et le bon déroulement des examens.`,
      },
      {
        // id: 15,
        name: `Responsable IT`,
        slug: TextFormatter.getTextSlug(`Responsable IT`),
        description: `Supervise les systèmes informatiques, la sécurité et l’accès aux plateformes.`,
      },
      {
        // id: 16,
        name: `Comptable`,
        slug: TextFormatter.getTextSlug(`Comptable`),
        description: `Responsable de la gestion financière et comptable de l'établissement.`,
      },
      {
        // id: 17,
        name: `Directeur Administratif`,
        slug: TextFormatter.getTextSlug(`Directeur Administratif`),
        description: `Supervise les opérations administratives de l’établissement, encadre les équipes de gestion.`,
      },
      {
        // id: 18,
        name: `Directeur Général`,
        slug: TextFormatter.getTextSlug(`Directeur Général`),
        description: `Responsable exécutif de l’établissement, prend les décisions stratégiques et institutionnelles.`,
      },
    ]

    for (const item of dataInsert) {
      await Role.updateOrCreate({ name: item.name, slug: item.slug }, item)
    }

    console.log('***** RoleSeeder Executed *****')
  }
}
