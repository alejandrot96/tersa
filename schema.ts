import { json, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const projects = pgTable('project', {
  id: text('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  userId: text('user_id').notNull(), // Link to Clerk user ID
  transcriptionModel: varchar('transcription_model').notNull(),
  visionModel: varchar('vision_model').notNull(),
  systemPrompt: text('system_prompt'),
  accentColor: varchar('accent_color').default('emerald'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  content: json('content'),
  image: varchar('image'),
});

export const profiles = pgTable('profile', {
  id: text('id').primaryKey().notNull(), // Clerk user ID
  email: varchar('email').notNull(),
  fullName: varchar('full_name'),
  firstName: varchar('first_name'),
  lastName: varchar('last_name'),
  imageUrl: varchar('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
}); // Auth schema
