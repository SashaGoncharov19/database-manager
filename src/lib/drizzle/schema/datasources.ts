import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { type InferInsertModel, relations } from 'drizzle-orm'

import { databases } from './databases'

export const datasource_providers = pgEnum('providers', ['mysql', 'postgresql'])

export const datasources = pgTable('datasources', {
    id: serial('id').primaryKey(),
    provider: datasource_providers('provider').notNull(),
    host: varchar('host', { length: 255 }).notNull(),
    port: varchar('port', { length: 255 }).notNull(),
    username: varchar('username', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
})

export const datasourcesRelations = relations(datasources, ({ many }) => ({
    databases: many(databases),
}))

export type Datasource = InferInsertModel<typeof datasources>
