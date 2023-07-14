import { Prisma } from "@prisma/client";

export type createFormArgs = Omit<Prisma.FormUncheckedCreateInput, 'createdAt'  | 'updatedAt'> ;
//export type updateAccountArgs = Partial<Omit<createAccountArgs, 'email' | 'id' | 'accountAddress' | 'issuer'>>;