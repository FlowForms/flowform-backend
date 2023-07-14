import { PrismaClient } from '@prisma/client';
import { createAccountArgs, updateAccountArgs } from '../../types/db';

export class AccountDB {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll() {
    return this.prisma.account.findMany();
  }

  async getByIssuer(issuer: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        issuer: issuer,
      },
    });

    return account;
  }

  async getByEmail(email: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    return account;
  }

  async getByUserName(userName: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        userName: userName,
      },
    });

    return account;
  }

  async getByAccountAddress(addr: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        accountAddress: addr,
      },
    });

    return account;
  }

  async create(arg: createAccountArgs) {
    const account = await this.prisma.account.create({
      data: { ...arg },
    });

    return account;
  }

  async update(email: string, arg: updateAccountArgs) {
    const account = await this.prisma.account.update({
      where: {
        email: email,
      },
      data: { ...arg },
    });

    return account;
  }

  async upsert(email: string, issuer: string, accountAddress: string, lastLoginAt: number, arg: updateAccountArgs) {
    const account = await this.prisma.account.upsert({
      where: {
        email: email,
      },
      update: { ...arg },
      create: { ...arg, email: email, issuer: issuer, accountAddress: accountAddress, lastLoginAt: lastLoginAt },
    });

    return account;
  }
}
