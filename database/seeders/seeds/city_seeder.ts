import { BaseSeeder } from '@adonisjs/lucid/seeders'
import City from '#models/city'
import { TextFormatter } from '#utils/text_formatter'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Recrée __dirname (car on est en ES Module)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename)

export default class CitySeeder extends BaseSeeder {
  async run() {
    const dataFilePath = path.join(__dirname, '../../data/cities.json')
    const readData = await fs.readFile(dataFilePath, 'utf-8')
    const data: any[] = JSON.parse(readData)

    const dataInsert = await Promise.all(
      data.map(async (item) => ({
        country_id: item.country_id,
        name: item.city,
        slug: TextFormatter.getTextSlug(item.city),
      }))
    )

    for (const item of dataInsert) {
      await City.updateOrCreate({ name: item.name, slug: item.slug }, item)
    }

    console.log('***** CitySeeder Executed *****')
  }
}
