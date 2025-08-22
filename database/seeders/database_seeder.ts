import { BaseSeeder } from '@adonisjs/lucid/seeders'
import LangSeeder from '#database/seeders/seeds/lang_seeder'
import CurrencySeeder from '#database/seeders/seeds/currency_seeder'
import CountrySeeder from '#database/seeders/seeds/country_seeder'
import CitySeeder from '#database/seeders/seeds/city_seeder'
import CivilitySeeder from '#database/seeders/seeds/civility_seeder'
import SocietySeeder from '#database/seeders/seeds/society_seeder'
import SettingSeeder from '#database/seeders/seeds/setting_seeder'
import MenuSeeder from '#database/seeders/seeds/menu_seeder'
import TypeSeeder from '#database/seeders/seeds/type_seeder'
import LevelSeeder from '#database/seeders/seeds/level_seeder'
import StatusSeeder from '#database/seeders/seeds/status_seeder'
import UnitSeeder from '#database/seeders/seeds/unit_seeder'
import RoleSeeder from '#database/seeders/seeds/role_seeder'
import AdminSeeder from '#database/seeders/seeds/admin_seeder'
import TeacherSeeder from '#database/seeders/seeds/teacher_seeder'
import StudentSeeder from '#database/seeders/seeds/student_seeder'
import CycleSeeder from '#database/seeders/seeds/cycle_seeder'
import FormationSeeder from '#database/seeders/seeds/formation_seeder'
import FieldSeeder from '#database/seeders/seeds/field_seeder'
import AcademicYearSeeder from '#database/seeders/seeds/academic_year_seeder'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    await new LangSeeder(this.client).run()
    await new CurrencySeeder(this.client).run()
    await new CountrySeeder(this.client).run()
    await new CitySeeder(this.client).run()
    await new CivilitySeeder(this.client).run()
    await new SocietySeeder(this.client).run()
    await new SettingSeeder(this.client).run()
    await new MenuSeeder(this.client).run()
    await new TypeSeeder(this.client).run()
    await new LevelSeeder(this.client).run()
    await new StatusSeeder(this.client).run()
    await new UnitSeeder(this.client).run()
    await new RoleSeeder(this.client).run()
    await new AdminSeeder(this.client).run()
    await new TeacherSeeder(this.client).run()
    await new StudentSeeder(this.client).run()
    await new AcademicYearSeeder(this.client).run()
    await new CycleSeeder(this.client).run()
    await new FormationSeeder(this.client).run()
    await new FieldSeeder(this.client).run()
  }
}
