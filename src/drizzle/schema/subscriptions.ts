import { timestamp } from 'drizzle-orm/pg-core'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text().notNull().unique(),
  createAt: timestamp('created_at').notNull().defaultNow(),
})
