/**
 * Constants for the application.
 * This file contains various constants used throughout the application,
 * including society information, email templates, and log messages.
 */
import type {
  TypeCategoryEnum,
  MenuLabelEnum,
  MenuLayoutEnum,
  TargetGuardEnum,
  VisibilityEnum,
  LevelCategoryEnum,
  StatusCategoryEnum,
  UnitCategoryEnum,
  AccessLogEnum,
  TokenTypeEnum,
  TokenableTypeEnum,
} from '#types/common'
import { ObjectHelper } from '#utils/object_helper'

// config/constants.ts
export const constants = {
  SOCIETY: {
    sigle: 'MIAGE Casa',
    name: 'MIAGE Casa',
    nameSigle: 'MIAGE Casa',
    slogan: '',
    phone: '',
    phoneText: '',
    phoneSnd: '',
    phoneTextSnd: '',
    phoneWhatsapp: '',
    email: 'bureau@groupemiage.net',
    domain: 'www.groupemiage.net',
    domainUrl: 'https://groupemiage.net',
    location: '',
    seat: 'Casablanca - Maroc',
    keywords: '',
    description: '',
    socialMedia: {
      facebook: '',
      linkedin: '',
      whatsapp: '',
      instagram: '',
      twitter: '',
      youtube: '',
    },
  },
  MAIL: {
    viewProblem: 'Cliquez ici, pour visualiser le mail depuis un navigateur',
    endThank: 'Merci pour votre confiance.',
    genAutoMsg: 'Ceci est un mail automatique, vous ne pouvez pas y répondre.',
    genAutoToReplyMsg:
      "Ce mail est généré de sorte que vous puissiez répondre directement à l'intéressé(e).",
    inProgressMsg:
      "Une action d'envoie de mails en masse est en cours sur le serveur, chaque deux (2) minutes la page sera rafraîchi pour vérifier si l'opération s'est achevée.",
    address: {
      test: 'maliki.tcherou1@gmail.com',
      noreply: 'noreply@madoct-clients.com',
    },
  },
  FILE_PATHS: {
    STORAGE: 'storage',
    APP: 'storage/app',
    PUBLIC: 'storage/app/public',
    UPLOADS: {
      ROOT: 'uploads',
      OTHER: 'uploads/others',
      ADMINS: {
        ROOT: 'uploads/admins',
        AVATARS: 'uploads/admins/avatars',
      },
      TEACHERS: {
        ROOT: 'uploads/teachers',
        AVATARS: 'uploads/teachers/avatars',
      },
      STUDENTS: {
        ROOT: 'uploads/students',
        AVATARS: 'uploads/students/avatars',
      },
      EVENTS: {
        ROOT: 'uploads/events',
        COVERS: 'uploads/events/covers',
        IMAGES: 'uploads/events/images',
      },
      ARTICLES: {
        ROOT: 'uploads/articles',
        COVERS: 'uploads/articles/covers',
        IMAGES: 'uploads/articles/images',
      },
      HOME_SLIDERS: {
        ROOT: 'uploads/home_sliders',
      },
      PARTNERS: {
        ROOT: 'uploads/partners',
      },
    },
  },
  LOG_MESSAGES: {
    ACCESS: {
      successful: 'SUCCESSFUL',
      failed: 'FAILED',
      accessed: 'ACCESSED',
    },
    GLOBAL: {
      internet: "Problème d'internet",
      sessionTimedOut: 'Session expirée',
      blockedAccount: 'Compte bloqué',
      incorrectUrl: 'Oops !!! Incorrect URL !',
      noDataFound: 'Pas de données !',
      serverError: `Le serveur a rencontré un problème inattendu, veuillez nous contacter si cela persiste`,
      invalidTokenError: `Unauthorized : Token invalide.`,
      expiredTokenError: `Unauthorized : Token expiré.`,
      revokedTokenError: `Unauthorized : Token déjà révoqué.`,
      emptyTokenError: `Unauthorized : Token non fourni.`,
      unauthorizedTitle: `You are not authorized to access this resource !`,
      unauthorizedTokensError: `Unauthorized : Token expiré ou invalide ou déjà révoqué ou non fourni.`,
      btn: {
        yes: 'Oui',
        no: 'Non',
        save: 'Enregistrer',
        add: 'Ajouter',
        edit: 'Modifier',
        del: 'Supprimer',
        change: 'Changer',
        confirm: 'Confirmer',
        continue: 'Continuer',
        cancel: 'Annuler',
        send: 'Envoyer',
        filter: 'Filtrer',
        search: 'Rechercher',
        import: 'Importer',
        export: 'Exporter',
        displayDetail: 'Afficher le détail',
        viewDetail: 'Voir le détail',
        linkList: 'Liste des liens',
      },
    },
    AUTH: {
      action: 'Authentication',
      message: {
        successful: 'Authentication reussie',
        failed: "Échec d'authentication",
        unamePwd: "Nom d'utilisateur (Identifiant) et/ou Mot de passe incorrect",
        emailPwd: 'E-mail (Identifiant) et/ou Mot de passe incorrect',
      },
      btn: {
        name: 'Authentifier',
      },
    },
    LOGIN: {
      action: 'Connexion',
      message: {
        successful: 'Connexion reussie',
        failed: 'Échec de connexion',
        unamePwd: "Nom d'utilisateur (Identifiant) et/ou Mot de passe incorrect",
        emailPwd: 'E-mail (Identifiant) et/ou Mot de passe incorrect',
      },
      btn: {
        name: 'Connecter',
      },
    },
    LOGOUT: {
      action: 'Déconnexion',
      message: {
        successful: 'Déconnexion reussie',
        failed: 'Échec de déconnexion',
        loadingLogout: "Consultation d'une page sans authentification",
      },
      btn: {
        name: 'Déconnecter',
      },
    },
    LOCK: {
      action: 'Verrouillage',
      message: {
        successful: 'Verrouillage reussie',
        failed: 'Échec de verrouillage',
      },
      btn: {
        name: 'Verrouiller',
      },
    },
    UNLOCK: {
      action: 'Déverrouillage',
      message: {
        successful: 'Déverrouillage reussie',
        failed: 'Échec de déverrouillage',
        password: 'Mot de passe incorrect',
      },
      btn: {
        name: 'Déverrouiller',
      },
    },
    FORGOT: {
      action: 'Demande de réinitialisation',
      message: {
        successful: 'Demande de réinitialisation reussie',
        failed: 'Échec de demande de réinitialisation',
        unameNotExist: "Cet nom d'utilisateur ou identifiant n'a pas de compte",
        emailNotExist: "Cette adresse e-mail n'a pas de compte",
      },
      btn: {
        name: 'Envoyer',
      },
    },
    RESET: {
      action: 'Réinitialisation',
      message: {
        successful: 'Réinitialisation reussie',
        failed: 'Échec de réinitialisation',
      },
      btn: {
        name: 'Réinitialiser',
      },
    },
    REFRESH: {
      action: 'Rafraichissement',
      message: {
        successful: 'Rafraichissement reussie',
        failed: 'Échec de rafraichissement',
      },
      btn: {
        name: 'Rafraichir',
      },
    },
    EXECUTION: {
      action: 'Exécution',
      message: {
        successful: 'Exécuté avec succès',
        failed: "Échec d'exécution",
        confirm: 'Voulez-vous exécuté ces informations ?',
      },
      btn: {
        name: 'Exécuter',
      },
    },
    VERIFY: {
      action: 'Vérification',
      message: {
        successful: 'Vérifié avec succès',
        failed: 'Échec de vérification',
        confirm: 'Voulez-vous vérifier ces informations ?',
      },
      btn: {
        name: 'Vérifier',
      },
    },
    VALIDATE: {
      action: 'Validation',
      message: {
        successful: 'Validé avec succès',
        failed: 'Échec de validation',
        confirm: 'Voulez-vous valider ces informations ?',
      },
      btn: {
        name: 'Valider',
      },
    },
    SAVE: {
      action: 'Enregistrement',
      message: {
        successful: 'Enregistré avec succès',
        failed: "Échec d'enregistrement",
        confirm: 'Voulez-vous enregistrer ces informations ?',
      },
      btn: {
        name: 'Enregistrer',
      },
    },
    CHANGE: {
      action: 'Changement',
      message: {
        successful: 'Changé avec succès',
        failed: 'Échec de changement',
        confirm: 'Voulez-vous changer ces informations ?',
      },
      btn: {
        name: 'Changer',
      },
    },
    CREATE: {
      action: 'Crée',
      message: {
        successful: 'Crée avec succès',
        failed: 'Échec de création',
        confirm: 'Voulez-vous créer ces informations ?',
      },
      btn: {
        name: 'Créer',
      },
    },
    GET: {
      action: 'Récupération',
      message: {
        successful: 'Données récupérées avec succès',
        failed: 'Échec de récupération de données',
        confirm: 'Voulez-vous récupérer ces informations ?',
      },
      btn: {
        name: 'Récupérer',
      },
    },
    ADD: {
      action: 'Ajout',
      message: {
        successful: 'Ajouté avec succès',
        failed: "Échec d'ajout",
        confirm: 'Voulez-vous ajouter ces informations ?',
      },
      btn: {
        name: 'Ajouter',
      },
    },
    EDIT: {
      action: 'Modification',
      message: {
        successful: 'Modifié avec succès',
        failed: 'Échec de modification',
        confirm: 'Voulez-vous modifier ces informations ?',
      },
      btn: {
        name: 'Modifier',
      },
    },
    DELETE_SOFT: {
      action: 'Suppression',
      message: {
        successful: 'Supprimé avec succès',
        failed: 'Échec de suppression',
        confirm: 'Voulez-vous supprimer cet élément ?',
      },
      btn: {
        name: 'Supprimer',
      },
    },
    DEL: {
      action: 'Suppression',
      message: {
        successful: 'Supprimé avec succès',
        failed: 'Échec de suppression',
        confirm: 'Voulez-vous supprimer cet élément ?',
      },
      btn: {
        name: 'Supprimer',
      },
    },
    RESTORE: {
      action: 'Restauration',
      message: {
        successful: 'Restauré avec succès',
        failed: 'Échec de restauration',
        confirm: 'Voulez-vous restaurer cet élément ?',
      },
      btn: {
        name: 'Restaurer',
      },
    },
    ENABLE: {
      action: 'Activation',
      message: {
        successful: 'Activé avec succès',
        failed: "Échec d'activation",
        confirm: 'Voulez-vous activer cet élément ?',
      },
      btn: {
        name: 'Activer',
      },
    },
    DISABLE: {
      action: 'Désactivation',
      message: {
        successful: 'Désactivé avec succès',
        failed: 'Échec de désactivation',
        confirm: 'Voulez-vous désactiver cet élément ?',
      },
      btn: {
        name: 'Désactiver',
      },
    },
    SHOW: {
      action: 'Vu',
      message: {
        successful: 'Visualisé avec succès',
        failed: 'Échec de Visualisation',
        confirm: 'Voulez-vous visualiser cet élément ?',
      },
      btn: {
        name: 'Voir',
      },
    },
    SEND: {
      action: 'Envoi',
      message: {
        successful: 'Envoyé avec succès',
        failed: "Échec d'envoi",
        confirm: 'Voulez-vous envoyer cet élément ?',
      },
      btn: {
        name: 'Envoyer',
      },
    },
    SUBSCRIBE: {
      action: 'Abonnement',
      message: {
        successful: 'Abonné avec succès',
        failed: "Échec d'abonnement",
        confirm: 'Voulez-vous abonner de cet élément ?',
      },
      btn: {
        name: 'Abonner',
      },
    },
    UNSUBSCRIBE: {
      action: 'Désabonnement',
      message: {
        successful: 'Désabonné avec succès',
        failed: 'Échec de désabonnement',
        confirm: 'Voulez-vous désabonner de cet élément ?',
      },
      btn: {
        name: 'Désabonner',
      },
    },
    AUTHORIZED: {
      action: 'Autorisation',
      message: {
        successful: 'Autorisé avec succès',
        failed: "Échec d'autorisation",
        confirm: 'Voulez-vous autoriser de cet élément ?',
      },
      btn: {
        name: 'Autoriser',
      },
    },
    UNAUTHORIZED: {
      action: 'Non autorisation',
      message: {
        successful: 'Non autorisé avec succès',
        failed: 'Échec de non autorisation',
        confirm: 'Voulez-vous ne pas autoriser de cet élément ?',
      },
      btn: {
        name: 'Ne pas autoriser',
      },
    },
    DOWNLOAD_FILE: {
      action: 'Téléchargement',
      message: {
        successful: 'Fichier téléchargé avec succès',
        failed: 'Échec de téléchargement du fichier',
        confirm: 'Voulez-vous télécharger cet fichier ?',
        empty: 'Aucun fichier sélectionné !',
      },
      btn: {
        name: 'Télécharger',
      },
    },
    UPLOAD_FILE: {
      action: 'Téléversement',
      message: {
        successful: 'Fichier téléversé avec succès',
        failed: 'Échec de téléversement du fichier',
        confirm: 'Voulez-vous téléverser cet fichier ?',
        empty: 'Aucun fichier sélectionné !',
      },
      btn: {
        name: 'Téléverser',
      },
    },
    IMPORT: {
      action: 'Importation',
      message: {
        successful: 'Données importées avec succès',
        failed: "Échec d'importation de données",
        confirm: 'Voulez-vous importer ces données ?',
        empty: "Échec d'importation, pas de données",
      },
      btn: {
        name: 'Importer',
      },
    },
    EXPORT: {
      action: 'Exportation',
      message: {
        successful: 'Données exportées avec succès',
        failed: "Échec d'exportation de données",
        confirm: 'Voulez-vous exporter ces données ?',
        empty: "Échec d'exportation, pas de données",
      },
      btn: {
        name: 'Exporter',
      },
    },
  },
  FORMS: {},
}

/**
 * Enumeration constants for the application.
 * These enums are used to define various categories, guards, and visibility options in the application.
 */
export const ACCESS_LOGS: AccessLogEnum[] = ['successful', 'failed', 'accessed']
export const ACCESS_LOGS_LIST = ObjectHelper.toList(ACCESS_LOGS)

export const TOKEN_TYPES: TokenTypeEnum[] = ['access_token', 'refresh_token']
export const TOKEN_TYPES_LIST = TOKEN_TYPES

export const TOKENABLE_TYPES: TokenableTypeEnum[] = ['Default', 'Admin', 'Teacher', 'Student']
export const TOKENABLE_TYPES_LIST = TOKENABLE_TYPES

export const TARGET_GUARDS: TargetGuardEnum[] = ['default', 'admin', 'teacher', 'student', 'shared']
export const TARGET_GUARDS_LIST = TARGET_GUARDS

export const VISIBILITIES: VisibilityEnum[] = ['default', 'public', 'private', 'internal']
export const VISIBILITIES_LIST = ObjectHelper.toList(VISIBILITIES)

export const UNIT_CATEGORIES: UnitCategoryEnum[] = ['default', 'duration']
export const UNIT_CATEGORIES_LIST = ObjectHelper.toList(UNIT_CATEGORIES)

export const STATUS_CATEGORIES: StatusCategoryEnum[] = ['default', 'enrollment']
export const STATUS_CATEGORIES_LIST = ObjectHelper.toList(STATUS_CATEGORIES)

export const LEVEL_CATEGORIES: LevelCategoryEnum[] = ['default', 'study', 'cycle']
export const LEVEL_CATEGORIES_LIST = ObjectHelper.toList(LEVEL_CATEGORIES)

export const TYPE_CATEGORIES: TypeCategoryEnum[] = [
  'default',
  'formation',
  'evaluation',
  'document',
  'identity',
  'department',
]
export const TYPE_CATEGORIES_LIST = ObjectHelper.toList(TYPE_CATEGORIES)

// Enumération des étiquettes de menu
export const MENU_LABELS: MenuLabelEnum[] = [
  'access',
  'read',
  'write',
  'del',
  'export',
  'import',
  'download',
  'upload',
]
export const MENU_LAYOUTS: MenuLayoutEnum[] = [
  'action',
  'action_access',
  'topbar',
  'topbar_action',
  'sidebar',
  'sidebar_action',
  'topbar_sidebar',
  'topbar_sidebar_action',
]
