DO $$ BEGIN
 CREATE TYPE "public"."providers" AS ENUM('mysql', 'postgresql');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "databases" (
	"id" serial PRIMARY KEY NOT NULL,
	"datasourceId" integer NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(256) NOT NULL,
	"database" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "datasources" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" "providers" NOT NULL,
	"host" varchar(255) NOT NULL,
	"port" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL
);
