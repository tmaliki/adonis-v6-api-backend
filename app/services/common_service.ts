import { MomentHelper } from '#utils/moment_helper'
// import { LuxonHelper } from '#utils/luxon_helper'

export interface UpdateColAtParams {
  row: any
  col: string
}

export class CommonService {
  /**
   * Met à jour une colonne `_at` dans une ligne donnée
   * @param row - Instance Lucid Model
   * @param col - Nom de la colonne à mettre à jour
   */
  static updateColAt = async ({ row, col }: UpdateColAtParams): Promise<void> => {
    try {
      ;(row as any)[col] = MomentHelper.dateTimeFormat({})
      await row.save()
    } catch (error: any) {
      throw new Error('CommonService updateColAt error : ' + error.message)
    }
  }
}
