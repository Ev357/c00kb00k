CREATE TABLE IF NOT EXISTS "c00kb00ks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recepies" (
	"id" serial PRIMARY KEY NOT NULL,
	"c00kb00kId" integer NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"image" text,
	"folderId" integer NOT NULL,
	"cookingTime" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersToC00kb00ks" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"c00kb00kId" integer NOT NULL,
	"ownerId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recepies" ADD CONSTRAINT "recepies_c00kb00kId_c00kb00ks_id_fk" FOREIGN KEY ("c00kb00kId") REFERENCES "public"."c00kb00ks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToC00kb00ks" ADD CONSTRAINT "usersToC00kb00ks_c00kb00kId_c00kb00ks_id_fk" FOREIGN KEY ("c00kb00kId") REFERENCES "public"."c00kb00ks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
