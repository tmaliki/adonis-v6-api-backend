import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Currency from '#models/currency'
import { TextFormatter } from '#utils/text_formatter'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Recrée __dirname (car on est en ES Module)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename)
// Ou
// const fileName = fileURLToPath(import.meta.url)
// const dirName = path.dirname(fileName)

export default class CurrencySeeder extends BaseSeeder {
  async run() {
    const dataFilePath = path.join(__dirname, '../../data/currencies.json')
    const readData = await fs.readFile(dataFilePath, 'utf-8')
    const data: any[] = JSON.parse(readData)

    const dataInsert = await Promise.all(
      data.map(async (item) => ({
        id: item.id,
        name: item.name,
        slug: TextFormatter.getTextSlug(item.name),
        code: item.code,
        code_num: item.code_num,
        exchange_rate: item.exchange_rate,
        actived: item.actived,
        sort_order: item.sort,
        default: item.default,
      }))
    )

    for (const item of dataInsert) {
      await Currency.updateOrCreate({ id: item.id }, item)
    }

    console.log('***** CurrencySeeder Executed *****')
  }
}
