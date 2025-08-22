import moment from 'moment'
import momentTz from 'moment-timezone'

const inFormats = [
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'MM-DD-YYYY',
  'YYYY/MM/DD',
  'DD/MM/YYYY',
  'MM/DD/YYYY',
  'DD-MM-YYYY HH:mm:ss',
  'YYYY-MM-DD HH:mm:ss',
  'DD/MM/YYYY HH:mm:ss',
  'MM/DD/YYYY HH:mm:ss',
  'DD.MM.YYYY',
  'YYYY.MM.DD',
]

export type DateTimeFormatOptions = {
  dt?: string | null
  outFt?: string
  inFt?: string[]
  addAmount?: number | null
  addUnit?: moment.unitOfTime.DurationConstructor | null
  tz?: string
}

export type CompareDatesOptions = {
  date1: string
  date2: string
  precision?: moment.unitOfTime.StartOf
  tz?: string
}

export type GenUnixOptions = {
  dt?: string | null
  tz?: string
}

export class MomentHelper {
  /**
   * Formatte une date avec options flexibles
   * @param param0
   * @returns
   */
  static dateTimeFormat = ({
    dt = null,
    outFt = 'YYYY-MM-DD HH:mm:ss',
    inFt = [],
    addAmount = null,
    addUnit = null,
    tz = 'Africa/Casablanca',
  }: DateTimeFormatOptions): string => {
    let dateTime = moment()
    const inputFormats = inFt.length > 0 ? inFt : inFormats

    if (dt) {
      dateTime = moment(dt, inputFormats, true)
      if (!dateTime.isValid()) {
        dateTime = moment(dt)
      }
    }

    if (tz) {
      dateTime = momentTz.tz(dateTime, tz)
    }

    if (addAmount && addUnit) {
      dateTime = dateTime.add(addAmount, addUnit)
    }

    return dateTime.format(outFt)
  }

  /**
   * Compare deux dates avec ou sans précision
   * @param param0
   * @returns
   */
  static compareDates = ({
    date1,
    date2,
    precision = undefined,
    tz = 'Africa/Casablanca',
  }: CompareDatesOptions): 'before' | 'after' | 'same' => {
    const d1 = momentTz.tz(date1, tz)
    const d2 = momentTz.tz(date2, tz)

    if (precision) {
      if (d1.isSame(d2, precision)) return 'same'
      if (d1.isBefore(d2, precision)) return 'before'
      return 'after'
    } else {
      if (d1.isSame(d2)) return 'same'
      if (d1.isBefore(d2)) return 'before'
      return 'after'
    }
  }

  /**
   * Génère un timestamp UNIX à partir d’une date (ou actuelle)
   * @param param0
   * @returns
   */
  static genUnixTimestamp = ({ dt = null, tz = 'Africa/Casablanca' }: GenUnixOptions): number => {
    const dateTime = dt ? momentTz.tz(dt, tz) : momentTz().tz(tz)
    return dateTime.unix()
  }
}
