import { PrismaClient } from '@prisma/client';
import { AccountDB, FormDB, FormFeildDB, ResponseDB } from './tables';


class DB {
  account: AccountDB;
  form: FormDB;
  feild: FormFeildDB;
  response: ResponseDB;

  constructor(prisma: PrismaClient) {
    this.account = new AccountDB(prisma);
    this.form = new FormDB(prisma);
    this.feild = new FormFeildDB(prisma);
    this.response = new ResponseDB(prisma);
  }
}

class PrismaHelper {
  public static Prisma: PrismaClient;

  static getPrisma() {
    //verify if prisma instance not exist
    if (this.Prisma === null || !this.Prisma)
      //create new one
      this.Prisma = new PrismaClient();
    return this.Prisma;
  }
}

export const prismaClient = PrismaHelper.getPrisma();
export const db = new DB(prismaClient);
