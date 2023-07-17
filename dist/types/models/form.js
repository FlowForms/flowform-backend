"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseSchema = exports.updateFormSchema = exports.createFormSchema = exports.getFormSchema = exports.formFeildSchema = exports.formFeildPropertySchema = exports.choiceSchema = exports.formSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.formSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    description: joi_1.default.string().optional().allow(null),
    isCaptchaEnabled: joi_1.default.boolean().optional().allow(null),
    isEmailCopyOfResponseEnabled: joi_1.default.boolean().optional().allow(null),
    isPublished: joi_1.default.boolean().optional().allow(null),
    metadata: joi_1.default.object().optional().allow(null),
    backgroundColor: joi_1.default.string().optional().allow(null),
    backgroundUrl: joi_1.default.string().optional().allow(null),
    accessGate: joi_1.default.string().valid(...Object.values(client_1.AccessGate)).optional().allow(null),
});
exports.choiceSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    label: joi_1.default.string().required(),
});
exports.formFeildPropertySchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    placeholderText: joi_1.default.string().optional().allow(null),
    verifySignature: joi_1.default.boolean().optional().allow(null),
    choices: joi_1.default.array().items(exports.choiceSchema).optional().allow(null),
    allowOtherChoice: joi_1.default.boolean().optional().allow(null),
    maxSelectionCount: joi_1.default.number().optional().allow(null),
    minSelectionCount: joi_1.default.number().optional().allow(null),
    max: joi_1.default.number().optional().allow(null),
    min: joi_1.default.number().optional().allow(null),
    endLabel: joi_1.default.string().optional().allow(null),
    startLabel: joi_1.default.string().optional().allow(null),
    numberType: joi_1.default.string().valid(...Object.values(client_1.NumberType)).optional().allow(null),
    validations: joi_1.default.array().items(...Object.values(client_1.ShortTextValidation)).optional().allow(null),
});
exports.formFeildSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    required: joi_1.default.boolean().required(),
    title: joi_1.default.string().required(),
    type: joi_1.default.string().valid(...Object.values(client_1.FieldType)).required(),
    description: joi_1.default.string().optional().allow(null),
    fieldOrder: joi_1.default.number().required(),
    properties: exports.formFeildPropertySchema.optional().allow(null)
});
exports.getFormSchema = joi_1.default.object({
    id: joi_1.default.string().required()
});
exports.createFormSchema = joi_1.default.object({
    form: exports.formSchema.required(),
    feilds: joi_1.default.array().items(exports.formFeildSchema).required()
});
exports.updateFormSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    form: exports.formSchema,
    feilds: joi_1.default.array().items(exports.formFeildSchema).optional().allow(null)
});
exports.createResponseSchema = joi_1.default.object({
    formId: joi_1.default.string().required(),
    data: joi_1.default.object().required()
});
//# sourceMappingURL=form.js.map