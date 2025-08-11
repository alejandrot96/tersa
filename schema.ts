import { json, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const projects = pgTable('project', {
  id: text('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  transcriptionModel: varchar('transcription_model').notNull(),
  visionModel: varchar('vision_model').notNull(),
  systemPrompt: text('system_prompt'),
  accentColor: varchar('accent_color').default('emerald'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  content: json('content'),
  image: varchar('image'),
});
