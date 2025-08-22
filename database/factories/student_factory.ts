import factory from '@adonisjs/lucid/factories'
import Student from '#models/student'
import Country from '#models/country'
import Civility from '#models/civility'
import { DateTime } from 'luxon'

export const StudentFactory = factory
  .define(Student, async ({ faker }) => {
    // Récupération des IDs existants
    const countries = await Country.query().select('id')
    const civilities = await Civility.query().select('id')

    // Utilitaires pour choisir un ID au hasard
    const countryId = faker.helpers.arrayElement(countries).id
    const civilityId = faker.helpers.arrayElement(civilities).id

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${faker.number.int({ min: 100, max: 999 })}`
    const email = faker.internet.email({ firstName, lastName })

    return {
      matricule: faker.string.numeric({ length: 10 }),
      firstName,
      lastName,
      username: username.slice(0, 25),
      email: email.toLowerCase(),
      emailVerifiedAt: DateTime.fromJSDate(new Date()),
      password: 'student123',
      phoneNumber: faker.phone.number(),
      birthDate: DateTime.fromJSDate(faker.date.past({ years: 30 })),
      biography: faker.lorem.paragraph(),
      nationalityId: countryId,
      callPrefixId: countryId,
      civilityId,
      actived: false,
    }
  })
  .build()
