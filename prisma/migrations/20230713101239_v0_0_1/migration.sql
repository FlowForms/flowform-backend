-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('short_text', 'long_text', 'number', 'rating', 'multiple_choice', 'flow_address', 'twitter_account', 'upload', 'date', 'physical_address');

-- CreateEnum
CREATE TYPE "BackgroundType" AS ENUM ('gradient', 'image');

-- CreateEnum
CREATE TYPE "NumberType" AS ENUM ('integer', 'float');

-- CreateEnum
CREATE TYPE "ShortTextValidation" AS ENUM ('url', 'email');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "user_name" TEXT,
    "email" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "account_address" TEXT NOT NULL,
    "parent_address" TEXT,
    "parent_wallet_connected" BOOLEAN DEFAULT false,
    "mobile" TEXT,
    "pic" TEXT,
    "metadata" JSONB,
    "last_login_at" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "is_captcha_enabled" BOOLEAN NOT NULL DEFAULT false,
    "is_email_copy_of_response_enabled" BOOLEAN NOT NULL DEFAULT false,
    "theme_id" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "account_address" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "background_color" TEXT NOT NULL,
    "background_url" TEXT,
    "background_type" "BackgroundType" NOT NULL,
    "font" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormField" (
    "id" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "description" TEXT,
    "field_order" INTEGER NOT NULL,
    "form_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Choice" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "form_field_property_id" TEXT NOT NULL,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormFeildProperty" (
    "id" TEXT NOT NULL,
    "placeholder_text" TEXT,
    "verify_signature" BOOLEAN,
    "allow_other_choice" BOOLEAN,
    "max_selection_count" INTEGER,
    "min_selection_count" INTEGER,
    "max" INTEGER,
    "min" INTEGER,
    "end_label" TEXT,
    "start_label" TEXT,
    "number_type" "NumberType",
    "short_text_validation" "ShortTextValidation"[] DEFAULT ARRAY[]::"ShortTextValidation"[],
    "form_feild_id" TEXT NOT NULL,

    CONSTRAINT "FormFeildProperty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_name_key" ON "Account"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_issuer_key" ON "Account"("issuer");

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_address_key" ON "Account"("account_address");

-- CreateIndex
CREATE INDEX "Account_account_address_idx" ON "Account"("account_address");

-- CreateIndex
CREATE INDEX "Account_email_idx" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Form_theme_id_key" ON "Form"("theme_id");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_form_id_key" ON "Theme"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "FormFeildProperty_form_feild_id_key" ON "FormFeildProperty"("form_feild_id");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_account_address_fkey" FOREIGN KEY ("account_address") REFERENCES "Account"("account_address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_form_field_property_id_fkey" FOREIGN KEY ("form_field_property_id") REFERENCES "FormFeildProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormFeildProperty" ADD CONSTRAINT "FormFeildProperty_form_feild_id_fkey" FOREIGN KEY ("form_feild_id") REFERENCES "FormField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
