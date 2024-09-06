import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { datasources } from './datasources'

export const databases = pgTable('databases', {
    id: serial('id').primaryKey(),
    datasourceId: integer('datasourceId').notNull(),
    username: varchar('username', { length: 255 }).notNull(),
    password: varchar('password', { length: 256 }).notNull(),
    database: varchar('database', { length: 256 }).notNull(),
})

export const databasesRelation = relations(databases, ({ one }) => ({
    datasource: one(datasources, {
        fields: [databases.datasourceId],
        references: [datasources.id],
    }),
}))
