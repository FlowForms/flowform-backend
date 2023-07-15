import Joi from 'joi';
import { AccessGate, FieldType, NumberType, ShortTextValidation } from '@prisma/client';

export const formSchema = Joi.object({
    id: Joi.string().required(),
    description: Joi.string().optional().allow(null),
    isCaptchaEnabled: Joi.boolean().optional().allow(null),
    isEmailCopyOfResponseEnabled: Joi.boolean().optional().allow(null),
    isPublished: Joi.boolean().optional().allow(null),
    metadata: Joi.object().optional().allow(null),
    backgroundColor: Joi.string().optional().allow(null),
    backgroundUrl: Joi.string().optional().allow(null),
    accessGate: Joi.string().valid(...Object.values(AccessGate)).optional().allow(null),
});

export const choiceSchema = Joi.object({
    id: Joi.string().required(),
    label: Joi.string().required(),
})

export const formFeildPropertySchema = Joi.object({
    id: Joi.string().required(),
    placeholderText: Joi.string().optional().allow(null),
    verifySignature: Joi.boolean().optional().allow(null),
    choices: Joi.array().items(choiceSchema).optional().allow(null),
    allowOtherChoice: Joi.boolean().optional().allow(null),
    maxSelectionCount: Joi.number().optional().allow(null),
    minSelectionCount: Joi.number().optional().allow(null),
    max: Joi.number().optional().allow(null),
    min: Joi.number().optional().allow(null),
    endLabel: Joi.string().optional().allow(null),
    startLabel: Joi.string().optional().allow(null),
    numberType: Joi.string().valid(...Object.values(NumberType)).optional().allow(null),
    validations: Joi.array().items(...Object.values(ShortTextValidation)).optional().allow(null),
})

export const formFeildSchema = Joi.object({
    id: Joi.string().required(),
    required: Joi.boolean().required(),
    title: Joi.string().required(),
    type: Joi.string().valid(...Object.values(FieldType)).required(),
    description: Joi.string().optional().allow(null),
    fieldOrder: Joi.number().required(),
    properties: formFeildPropertySchema.optional().allow(null)
})

export const getFormSchema = Joi.object({
    id: Joi.string().required()
});

export const createFormSchema = Joi.object({
    form: formSchema.required(),
    feilds: Joi.array().items(formFeildSchema).required()
});

export const updateFormSchema = Joi.object({
    id: Joi.string().required(),
    form: formSchema,
    feilds: Joi.array().items(formFeildSchema).optional().allow(null)
});

export type Form = {
    readonly id: string;
    readonly description?: string;
    readonly isCaptchaEnabled?: boolean;
    readonly isEmailCopyOfResponseEnabled?: boolean;
    readonly isPublished?: boolean;
    readonly metadata?: Record<string, Record<string, string>>;
    readonly backgroundColor?: string;
    readonly backgroundUrl?: string;
    readonly accessGate?: AccessGate
};

export type FormField = {
    readonly id: string;
    readonly required?: boolean;
    readonly title: string;
    readonly type: FieldType;
    readonly description?: string;
    readonly fieldOrder: number;
    readonly properties?: FormFeildProperty;
}

export type FormFeildProperty = {
    readonly id: string;
    readonly placeholderText?: string;
    readonly verifySignature?: boolean;

    readonly choices?: Choice[];

    readonly allowOtherChoice?: boolean;
    readonly maxSelectionCount?: number;
    readonly minSelectionCount?: number;
    readonly max?: number;
    readonly min?: number;
    readonly endLabel?: string;
    readonly startLabel?: string;
    readonly numberType?: NumberType;
    readonly validations?: ShortTextValidation[];
}

export type Choice = {
    readonly id: string;
    readonly label: string;
}

export type GetFormRequestBody = {
    readonly id: string;
};

export type CreateFormRequestBody = {
    readonly form: Form;
    readonly feilds: FormField[]
};

export type CreateResponseRequestBody = {
    readonly formId: string;
    readonly data: any;
};

export const createResponseSchema = Joi.object({
    formId: Joi.string().required(),
    data: Joi.object().required()
});

export type UpdateFormRequestBody = {
    readonly id: string;
    readonly form?: Form;
    readonly feilds?: FormField[]
};

