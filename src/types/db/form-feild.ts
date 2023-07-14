import { Prisma } from "@prisma/client";

export type createFormFeildArgs = Omit<Prisma.FormFieldUncheckedCreateInput, 'createdAt'  | 'updatedAt'> ;
//export type updateAccountArgs = Partial<Omit<createAccountArgs, 'email' | 'id' | 'accountAddress' | 'issuer'>>;