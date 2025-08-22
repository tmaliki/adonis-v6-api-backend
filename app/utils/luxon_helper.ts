import { DateTime } from 'luxon'

export type LuxonFormatOptions = {
  dt?: string | null
  outFt?: string
  tz?: string
}

export class LuxonHelper {
  /**
   * Formatte une date avec Luxon, gestion de fuseau horaire incluse
   * @param param0 - Options de formatage
   * @returns Date formatée
   */
  static dateTimeFormat = ({
    dt = null,
    outFt = 'yyyy-MM-dd HH:mm:ss',
    tz = 'Africa/Casablanca',
  }: LuxonFormatOptions): string => {
    const dateTime = dt ? DateTime.fromISO(dt, { zone: tz }) : DateTime.now().setZone(tz)

    return dateTime.toFormat(outFt)
  }
}
