import { PrismaClient } from '@prisma/client';
import { Form } from '../../types';


export class FormDB {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll(accountAddress: string) {
    return this.prisma.form.findMany({
        where: {
            accountAddress: accountAddress
        }
    });
  }

  async get(id: string) {
    return this.prisma.form.findUnique({
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
            } 
        }
    })
  }

  async create(accountAddress: string, data: Form) {
    const { theme, ...formData } = data;

    const form = await this.prisma.form.create({
       data: {
        ...formData,
        themeId: theme.id,
        accountAddress: accountAddress,
        Theme: {
            create: theme
        }
       }
    });

    return form;
  }

//   async update(email: string, arg: updateAccountArgs) {
//     const account = await this.prisma.account.update({
//       where: {
//         email: email,
//       },
//       data: { ...arg },
//     });

//     return account;
//   }

//   async upsert(email: string, issuer: string, accountAddress: string, lastLoginAt: number, arg: updateAccountArgs) {
//     const account = await this.prisma.account.upsert({
//       where: {
//         email: email,
//       },
//       update: { ...arg },
//       create: { ...arg, email: email, issuer: issuer, accountAddress: accountAddress, lastLoginAt: lastLoginAt },
//     });

//     return account;
//   }
}
