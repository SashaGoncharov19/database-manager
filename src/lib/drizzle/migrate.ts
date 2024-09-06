import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { pg } from '$lib/drizzle/config'

const db = drizzle(pg)

async function migrateDatabase() {
    console.log('Starting migrations')
    await migrate(db, { migrationsFolder: 'drizzle' })
    console.log('Migrations ended')

    process.exit(0)
}

migrateDatabase().catch(err => {
    console.log(err)
})
