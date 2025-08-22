import factory from '@adonisjs/lucid/factories'
import Lang from '#models/lang'

export const LangFactory = factory
  .define(Lang, async ({ faker }) => {
    return {
      name: faker.lorem.word(),
      slug: faker.helpers.slugify(faker.lorem.words(1)),
      locale: 'en',
      date_format: 'Y-m-d',
      datetime_format: 'Y-m-d H:i:s',
      date_separator: '-',
      time_separator: ':',
      icon: 'default.png',
    }
  })
  .build()
