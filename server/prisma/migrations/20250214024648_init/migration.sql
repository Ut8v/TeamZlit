/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "user_id" UUID;

-- CreateTable
CREATE TABLE "createTeam" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "teamName" TEXT,
    "teamDescription" TEXT,
    "teamType" TEXT,
    "roles" TEXT,
    "skills" TEXT[],
    "visibility" TEXT,
    "additionalNotes" TEXT,

    CONSTRAINT "createTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rolesRequired" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamId" BIGINT,
    "role" TEXT,
    "quantity" INTEGER,

    CONSTRAINT "rolesRequired_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceLevels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExperienceLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterestAreas" (
    "id" SERIAL NOT NULL,
    "interest" TEXT NOT NULL,

    CONSTRAINT "InterestAreas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statuses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRoles" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "is_filled" BOOLEAN NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "TeamRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamSkills" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "TeamSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TeamTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamUsers" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "team_role_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "TeamUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "user_id" INTEGER NOT NULL,
    "team_type_id" INTEGER NOT NULL,
    "visibility_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "additional_notes" TEXT,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMETZ(6) NOT NULL,
    "end_time" TIMETZ(6) NOT NULL,

    CONSTRAINT "TimeSlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAvailabilities" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "weekday_id" INTEGER NOT NULL,
    "time_slot_id" INTEGER NOT NULL,

    CONSTRAINT "UserAvailabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInterestAreas" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "interest_area_id" INTEGER,

    CONSTRAINT "UserInterestAreas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferredTeamTypes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "team_type_id" INTEGER NOT NULL,

    CONSTRAINT "UserPreferredTeamTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSkills" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "UserSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersLookingForTeams" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "user_id" INTEGER NOT NULL,
    "experience_level_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,

    CONSTRAINT "UsersLookingForTeams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visibilities" (
    "id" SERIAL NOT NULL,
    "Level" TEXT NOT NULL,

    CONSTRAINT "Visibilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weekdays" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Weekdays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "createPost" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posts" JSON,

    CONSTRAINT "createPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
