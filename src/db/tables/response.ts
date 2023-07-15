import { PrismaClient } from '@prisma/client';

export class ResponseDB {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(formId: string, data: Record<string, Record<string, string>>) {
    await this.prisma.response.create({
      data: {
        formId: formId,
        data: data,
      },
    });
  }

  async get(formId: string) {
    await this.prisma.response.findMany({
      where: {
        formId: formId,
      },
    });
  }
}
