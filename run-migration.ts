import { database } from './lib/database';
import { sql } from 'drizzle-orm';

const migrationSQL = `
DROP TABLE IF EXISTS "project";
DROP TABLE IF EXISTS "profile";

CREATE TABLE "profile" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"full_name" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"image_url" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);

CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"user_id" text NOT NULL,
	"transcription_model" varchar NOT NULL,
	"vision_model" varchar NOT NULL,
	"system_prompt" text,
	"accent_color" varchar DEFAULT 'emerald',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"content" json,
	"image" varchar
);
`;

async function runMigration() {
  try {
    console.log('Running migration...');
    await database.execute(sql.raw(migrationSQL));
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigration();