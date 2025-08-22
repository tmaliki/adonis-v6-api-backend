import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Country from '#models/country'
import db from '@adonisjs/lucid/services/db'
import { TextFormatter } from '#utils/text_formatter'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Recrée __dirname (car on est en ES Module)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename)

export default class CountrySeeder extends BaseSeeder {
  async run() {
    // Récupérer les IDs des devises existantes
    const currencies = await db.from('currencies').select('id')

    const dataFilePath = path.join(__dirname, '../../data/countries.json')
    const readData = await fs.readFile(dataFilePath, 'utf-8')
    const data: any[] = JSON.parse(readData)

    const dataInsert = await Promise.all(
      data.map(async (item) => {
        const currencyExists = currencies.some((currency) => currency.id === item.currency_id)
        return {
          id: item.id,
          name: item.name,
          slug: TextFormatter.getTextSlug(item.name),
          nationality: item.nationality,
          iso_code2: item.iso_code2,
          call_prefix: item.call_prefix,
          currency_id: currencyExists ? item.currency_id : null,
          contains_states: item.contains_states,
          need_identification_number: item.need_identification_number,
          need_zip_code: item.need_zip_code,
          zip_code_format: item.zip_code_format,
          display_tax_label: item.display_tax_label,
        }
      })
    )

    for (const item of dataInsert) {
      await Country.updateOrCreate({ id: item.id }, item)
    }

    console.log('***** CountrySeeder Executed *****')
  }
}
