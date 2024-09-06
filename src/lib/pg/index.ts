import { eq } from 'drizzle-orm'

import { generatePassword, generateUsername } from '$lib/generators'

import { pg } from '$lib/drizzle/config'
import { db } from '$lib/drizzle'
import { databases } from '$lib/drizzle/schema'

export async function createPostgresDatabase(datasourceId: number) {
    const dbUser = generateUsername()
    const dbPassword = generatePassword()

    const createUserQuery = `CREATE USER ${dbUser} WITH PASSWORD '${dbPassword}';`
    const createDatabaseQuery = `CREATE DATABASE ${dbUser};`
    const grantPrivilegesQuery = `GRANT ALL PRIVILEGES ON DATABASE ${dbUser} TO ${dbUser};`

    try {
        pg.unsafe(createUserQuery)
            .then(() => {
                return pg.unsafe(createDatabaseQuery)
            })
            .then(() => {
                return pg.unsafe(grantPrivilegesQuery)
            })

        await db.insert(databases).values({
            datasourceId,
            database: dbUser,
            username: dbUser,
            password: dbPassword,
        })
    } catch (e) {
        console.log(e)
    }
}

export async function dropPostgresDatabase(dbName: string) {
    const revokePrivilegesQuery = `REVOKE ALL PRIVILEGES ON DATABASE ${dbName} FROM ${dbName};`
    const dropDatabaseQuery = `DROP DATABASE ${dbName};`
    const dropUserQuery = `DROP USER ${dbName};`

    try {
        pg.unsafe(revokePrivilegesQuery)
            .then(() => {
                return pg.unsafe(dropDatabaseQuery)
            })
            .then(() => {
                return pg.unsafe(dropUserQuery)
            })

        await db.delete(databases).where(eq(databases.database, dbName))
    } catch (e) {
        console.log(e)
    }
}
