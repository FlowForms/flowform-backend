"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const tables_1 = require("./tables");
class DB {
    constructor(prisma) {
        this.account = new tables_1.AccountDB(prisma);
        this.form = new tables_1.FormDB(prisma);
        this.feild = new tables_1.FormFeildDB(prisma);
        this.response = new tables_1.ResponseDB(prisma);
    }
}
class PrismaHelper {
    static getPrisma() {
        //verify if prisma instance not exist
        if (this.Prisma === null || !this.Prisma)
            //create new one
            this.Prisma = new client_1.PrismaClient();
        return this.Prisma;
    }
}
exports.prismaClient = PrismaHelper.getPrisma();
exports.db = new DB(exports.prismaClient);
//# sourceMappingURL=db.js.map