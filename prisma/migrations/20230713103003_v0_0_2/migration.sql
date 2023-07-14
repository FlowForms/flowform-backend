-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_form_field_property_id_fkey";

-- DropForeignKey
ALTER TABLE "FormFeildProperty" DROP CONSTRAINT "FormFeildProperty_form_feild_id_fkey";

-- DropForeignKey
ALTER TABLE "FormField" DROP CONSTRAINT "FormField_form_id_fkey";

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_form_field_property_id_fkey" FOREIGN KEY ("form_field_property_id") REFERENCES "FormFeildProperty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormFeildProperty" ADD CONSTRAINT "FormFeildProperty_form_feild_id_fkey" FOREIGN KEY ("form_feild_id") REFERENCES "FormField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
