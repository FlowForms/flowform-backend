"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDB = void 0;
class AccountDB {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.account.findMany();
        });
    }
    getByIssuer(issuer) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.prisma.account.findUnique({
                where: {
                    issuer: issuer,
                },
            });
            return account;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.prisma.account.findUnique({
                where: {
                    email: email,
                },
            });
            return account;
        });
    }
    getByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.prisma.account.findUnique({
                where: {
                    userName: userName,
                },
            });
            return account;
        });
    }
    getByAccountAddress(addr) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.prisma.account.findUnique({
                where: {
                    accountAddress: addr,
                },
            });
            return account;
        });
    }
    create(arg) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.prisma.account.create({
                data: Object.assign({}, arg),
            });
            return account;
        });
    }
    update(email, arg) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.prisma.account.update({
                where: {
                    email: email,
                },
                data: Object.assign({}, arg),
            });
            return account;
        });
    }
    upsert(email, issuer, accountAddress, lastLoginAt, arg) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.prisma.account.upsert({
                where: {
                    email: email,
                },
                update: Object.assign({}, arg),
                create: Object.assign(Object.assign({}, arg), { email: email, issuer: issuer, accountAddress: accountAddress, lastLoginAt: lastLoginAt }),
            });
            return account;
        });
    }
}
exports.AccountDB = AccountDB;
//# sourceMappingURL=account.js.map