import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import { LangFactory } from '#database/factories/lang_factory'
import Lang from '#models/lang'
import { TextFormatter } from '#utils/text_formatter'

export default class LangSeeder extends BaseSeeder {
  async run() {
    const dataInsert = [
      {
        name: 'Français',
        slug: TextFormatter.getTextSlug('Français'),
        locale: 'fr',
        date_format: 'd/m/Y',
        datetime_format: 'd/m/Y H:i:s',
        date_separator: '/',
        time_separator: ':',
        icon: 'fr.png',
      },
      {
        name: 'Anglais',
        slug: TextFormatter.getTextSlug('Anglais'),
        locale: 'en',
        date_format: 'Y-m-d',
        datetime_format: 'Y-m-d H:i:s',
        date_separator: '-',
        time_separator: ':',
        icon: 'en.png',
      },
    ]

    // for (const item of dataInsert) {
    //   await LangFactory.merge(item).create()
    // }

    for (const item of dataInsert) {
      await Lang.updateOrCreate({ locale: item.locale }, item)
    }

    console.log('***** LangSeeder Executed *****')
  }
}
