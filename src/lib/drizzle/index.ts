import { drizzle } from 'drizzle-orm/postgres-js'

import { pg } from '$lib/drizzle/config'
import * as schema from '$lib/drizzle/schema'

export const db = drizzle(pg, { schema })
