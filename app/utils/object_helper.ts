export class ObjectHelper {
  /**
   * Modifier un objet : supprimer des clés et/ou en ajouter de nouvelles
   * @param obj - Objet d’origine
   * @param keysToRemove - Liste des clés à supprimer
   * @param keysToAdd - Clés/valeurs à ajouter à l’objet
   * @returns
   */
  static modifyObject = <T extends Record<string, any>>(
    obj: T,
    keysToRemove: string[] = [],
    keysToAdd: Partial<T> = {}
  ): Partial<T> => {
    const filteredObj: Partial<T> = {}

    for (const key in obj) {
      if (!keysToRemove.includes(key)) {
        filteredObj[key] = obj[key]
      }
    }

    return {
      ...filteredObj,
      ...keysToAdd,
    }
  }

  /**
   * Transforme un tableau de chaînes de caractères en un tableau d'objets avec id, key et label
   * @param arr - Tableau de chaînes de caractères
   * @returns
   */
  static toList = (arr: string[]) =>
    arr.map((key, index) => ({
      id: index + 1,
      key,
      label: LABELS_FR[key] || key.charAt(0).toUpperCase() + key.slice(1), // Première lettre en majuscule
    }))
}

// Dictionnaire de traduction pour les labels
export const LABELS_FR: Record<string, string> = {
  default: `Par défaut`,

  admin: `Administrateur`,
  teacher: `Enseignant`,
  student: `Étudiant`,
  shared: `Partagé`,

  public: `Public`,
  private: `Privé`,
  internal: `Interne`,

  study: `Étude`,
  cycle: `Cycle`,

  enrollment: `Inscription`,

  duration: `Durée`,

  department: `Département`,
  document: `Document`,
  evaluation: `Evaluation`,
  formation: `Diplôme/Formation`,
  identity: `Carte d'dentité`,
}
