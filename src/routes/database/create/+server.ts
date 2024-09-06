import { json } from '@sveltejs/kit'
import { createPostgresDatabase } from '$lib/pg'

export async function POST({ request }) {
    const data = await request.json()

    if (!data.id) return json(false)

    await createPostgresDatabase(data.id)

    return json(true)
}
