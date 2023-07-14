import { Prisma } from "@prisma/client";

export type createAccountArgs = Omit<Prisma.AccountCreateInput, 'createdAt'  | 'updatedAt'> ;
export type updateAccountArgs = Partial<Omit<createAccountArgs, 'email' | 'id' | 'accountAddress' | 'issuer'>>;

