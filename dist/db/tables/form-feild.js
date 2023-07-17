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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFeildDB = void 0;
class FormFeildDB {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAll(formID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.formField.findMany({
                where: {
                    formId: formID,
                },
            });
        });
    }
    prepareFormData(formId, args) {
        const formFeildArgs = args.map((feild) => {
            return {
                id: feild.id,
                required: feild.required,
                title: feild.title,
                type: feild.type,
                description: feild.description,
                fieldOrder: feild.fieldOrder,
                formId: formId,
            };
        });
        const choicePropertyArgs = [];
        const formFeildPropertiesArgs = args
            .filter((feild) => feild.properties)
            .map((feild) => {
            const _a = feild.properties, { choices } = _a, properties = __rest(_a, ["choices"]);
            if (choices) {
                const allChoices = choices.map((choice) => {
                    return {
                        id: choice.id,
                        label: choice.label,
                        formFieldPropertyId: properties.id,
                    };
                });
                choicePropertyArgs.push(...allChoices);
            }
            return Object.assign({ formFeildId: feild.id }, properties);
        });
        return {
            formFeildArgs,
            choicePropertyArgs,
            formFeildPropertiesArgs,
        };
    }
    createMany(formId, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { formFeildArgs, formFeildPropertiesArgs, choicePropertyArgs } = this.prepareFormData(formId, args);
            yield this.prisma.$transaction([
                this.prisma.formField.createMany({
                    data: formFeildArgs,
                    skipDuplicates: true,
                }),
                this.prisma.formFeildProperty.createMany({
                    data: formFeildPropertiesArgs,
                    skipDuplicates: true,
                }),
                this.prisma.choice.createMany({
                    data: choicePropertyArgs,
                    skipDuplicates: true,
                }),
            ]);
        });
    }
    updateMany(formId, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { formFeildArgs, formFeildPropertiesArgs, choicePropertyArgs } = this.prepareFormData(formId, args);
            yield this.prisma.$transaction([
                this.prisma.formField.deleteMany({
                    where: {
                        formId: formId
                    },
                }),
                this.prisma.formField.createMany({
                    data: formFeildArgs,
                    skipDuplicates: true,
                }),
                this.prisma.formFeildProperty.createMany({
                    data: formFeildPropertiesArgs,
                    skipDuplicates: true,
                }),
                this.prisma.choice.createMany({
                    data: choicePropertyArgs,
                    skipDuplicates: true,
                })
            ]);
        });
    }
}
exports.FormFeildDB = FormFeildDB;
//# sourceMappingURL=form-feild.js.map