CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"transcription_model" varchar NOT NULL,
	"vision_model" varchar NOT NULL,
	"system_prompt" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"content" json,
	"image" varchar
);
