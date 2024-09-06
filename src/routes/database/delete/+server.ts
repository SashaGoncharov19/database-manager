import { json } from '@sveltejs/kit'
import { dropPostgresDatabase } from '$lib/pg'

export async function POST({ request }) {
    const data = await request.json()

    if (!data.dbName) return json(false)

    await dropPostgresDatabase(data.dbName)

    return json(true)
}
