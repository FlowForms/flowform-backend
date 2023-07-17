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
exports.FormDB = void 0;
class FormDB {
    constructor(prisma) {
        this.prisma = prisma;
    }
    prepareData(form) {
        if (!form)
            return form;
        delete form["createdAt"];
        delete form["updatedAt"];
        delete form["accountAddress"];
        form.feilds = form.feilds.map((f) => {
            delete f["createdAt"];
            delete f["updatedAt"];
            delete f["formId"];
            if (f["properties"]["formFeildId"])
                delete f["properties"]["formFeildId"];
            if (f["properties"]["choices"]) {
                f["properties"]["choices"] = f["properties"]["choices"].map((c) => {
                    delete c["formFieldPropertyId"];
                    return c;
                });
            }
            return f;
        });
        return form;
    }
    getAll(accountAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.form.findMany({
                where: {
                    accountAddress: accountAddress
                }
            });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = yield this.prisma.form.findUnique({
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
            });
            return this.prepareData(form);
        });
    }
    create(accountAddress, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = yield this.prisma.form.create({
                data: Object.assign(Object.assign({}, data), { accountAddress: accountAddress })
            });
            return form;
        });
    }
    upsert(accountAddress, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = yield this.prisma.form.upsert({
                where: {
                    id: data.id
                },
                update: data,
                create: Object.assign(Object.assign({}, data), { accountAddress: accountAddress })
            });
            return form;
        });
    }
    delete(id, accountAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.form.deleteMany({
                where: {
                    id: id,
                    accountAddress: accountAddress
                }
            });
        });
    }
}
exports.FormDB = FormDB;
//# sourceMappingURL=form.js.map