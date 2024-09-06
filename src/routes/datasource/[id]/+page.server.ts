import { db } from '$lib/drizzle'

export const load = async ({ params }) => {
    const id = Number(params.id)

    if (!params.id) return

    const databaseList = await db.query.databases.findMany({
        where: (databases, { eq }) => eq(databases.datasourceId, id),
    })

    return {
        databaseList,
        sourceId: id,
    }
}
