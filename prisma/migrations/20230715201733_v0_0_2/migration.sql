-- CreateEnum
CREATE TYPE "AccessGate" AS ENUM ('nft', 'twitter', 'deployed_contract', 'find_profile');

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "access_gate" "AccessGate";
