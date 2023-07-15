import { PrismaClient } from '@prisma/client';
import { Form } from '../../types';


export class FormDB {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private prepareData(form: any) {
    delete form["createdAt"]
    delete form["updatedAt"]
    delete form["accountAddress"]

    form.feilds = form.feilds.map((f:any) => {
      delete f["createdAt"]
      delete f["updatedAt"]
      delete f["formId"]

      delete f["properties"]["formFeildId"]
      if(f["properties"]["choices"]) {
        f["properties"]["choices"] = f["properties"]["choices"].map((c:any) => {
          delete c["formFieldPropertyId"]
          return c
        })
      }

      return f
    })
    return form
  }

  async getAll(accountAddress: string) {
    return this.prisma.form.findMany({
        where: {
            accountAddress: accountAddress
        }
    });
  }

  async get(id: string) {
    const form = await this.prisma.form.findUnique({
        where: {
            id: id
        }, 
        include: {
            feilds: {
                include: {
                    properties: {
                        include: {
                            choices: true
                        }
                    }
                }
            }, 
            response: true 
        }
    })

    return this.prepareData(form)
  }

  async create(accountAddress: string, data: Form) {
    const form = await this.prisma.form.create({
       data: {
        ...data,
        accountAddress: accountAddress,
       }
    });

    return form;
  }

  async upsert(accountAddress: string, data: Form) {
    const form = await this.prisma.form.upsert({
      where: {
        id: data.id
      },
      update: data,
      create: {
        ...data,
        accountAddress: accountAddress,
      }
    });

    return form;
  }

  async delete(id: string, accountAddress: string) {
    await this.prisma.form.deleteMany({
      where: {
        id: id,
        accountAddress: accountAddress
      }
    })
  }
}
