import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Menu from '#models/menu'
import { TextFormatter } from '#utils/text_formatter'

export default class MenuSeeder extends BaseSeeder {
  async run() {
    // "label" => ["access", "list", "add", "edit", "del", "export", "download"]
    // "layout" => ["action_access", "topbar", "topbar_action", "sidebar", "sidebar_action", "topbar_sidebar", "topbar_sidebar_action"]

    const dataInsert = [
      {
        // id: 1,
        parentId: null,
        title: `Tableau de bord`,
        slug: TextFormatter.getTextSlug(`Tableau de bord`),
        label: 'access' as 'access',
        layout: 'sidebar' as 'sidebar',
        method: 'dashboard-access',
        actived: true,
      },
    ]

    for (const item of dataInsert) {
      await Menu.updateOrCreate({ title: item.title, slug: item.slug }, item)
    }

    console.log('***** MenuSeeder Executed *****')
  }
}
