import { defineConfig, drivers } from '@adonisjs/core/hash'

const hashConfig = defineConfig({
  default: 'scrypt',

  list: {
    scrypt: drivers.scrypt({
      cost: 16384,
      blockSize: 8,
      parallelization: 1,
      maxMemory: 33554432,
    }),

    bcrypt: drivers.bcrypt({
      rounds: 10,
    }),

    // argon: drivers.argon2({
    //   variant: 'id',
    //   iterations: 3,
    //   memory: 4096,
    //   parallelism: 1,
    //   saltSize: 16,
    // }),
  },
})

export default hashConfig

/**
 * Inferring types for the list of hashers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface HashersList extends InferHashers<typeof hashConfig> {}
}
