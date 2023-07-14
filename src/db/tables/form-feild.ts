import { Prisma, PrismaClient } from '@prisma/client';

import { FormField } from '../../types';

type FormData = {
  formFeildArgs: Prisma.FormFieldCreateManyInput[];
  choicePropertyArgs: Prisma.ChoiceCreateManyInput[];
  formFeildPropertiesArgs: Prisma.FormFeildPropertyCreateManyInput[];
};

export class FormFeildDB {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll(formID: string) {
    return this.prisma.formField.findMany({
      where: {
        formId: formID,
      },
    });
  }

  private prepareFormData(formId: string, args: FormField[]): FormData {
    const formFeildArgs: Prisma.FormFieldCreateManyInput[] = args.map((feild) => {
      return {
        id: feild.id,
        required: feild.required,
        title: feild.title,
        type: feild.type,
        description: feild.description,
        fieldOrder: feild.fieldOrder,
        formId: formId,
      };
    });

    const choicePropertyArgs: Prisma.ChoiceCreateManyInput[] = [];

    const formFeildPropertiesArgs: Prisma.FormFeildPropertyCreateManyInput[] = args
      .filter((feild) => feild.properties)
      .map((feild) => {
        const { choices, ...properties } = feild.properties;

        if (choices) {
          const allChoices = choices.map((choice) => {
            return {
              id: choice.id,
              label: choice.label,
              formFieldPropertyId: properties.id,
            };
          });

          choicePropertyArgs.push(...allChoices);
        }

        return {
          formFeildId: feild.id,
          ...properties,
        };
      });

    return {
      formFeildArgs,
      choicePropertyArgs,
      formFeildPropertiesArgs,
    };
  }

  async createMany(formId: string, args: FormField[]) {
    const { formFeildArgs, formFeildPropertiesArgs, choicePropertyArgs } = this.prepareFormData(formId, args);

    await this.prisma.$transaction([
      this.prisma.formField.createMany({
        data: formFeildArgs,
        skipDuplicates: true,
      }),
      this.prisma.formFeildProperty.createMany({
        data: formFeildPropertiesArgs,
        skipDuplicates: true,
      }),
      this.prisma.choice.createMany({
        data: choicePropertyArgs,
        skipDuplicates: true,
      }),
    ]);
  }

  async updateMany(formId: string, args: FormField[]) {
    const { formFeildArgs, formFeildPropertiesArgs, choicePropertyArgs } = this.prepareFormData(formId, args);

    const feildIds = formFeildArgs.map((feild) => feild.id);

    await this.prisma.$transaction([
      this.prisma.formField.deleteMany({
        where: {
          id: {
            in: feildIds,
          },
        },
      }),
      this.prisma.formField.createMany({
        data: formFeildArgs,
        skipDuplicates: true,

      }),
      this.prisma.formFeildProperty.createMany({
        data: formFeildPropertiesArgs,
        skipDuplicates: true,
      }),
      this.prisma.choice.createMany({
        data: choicePropertyArgs,
        skipDuplicates: true,
      })
    ]);
  }
}
