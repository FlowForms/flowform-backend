import Joi from 'joi';
import { BackgroundType, FieldType, NumberType, ShortTextValidation } from '@prisma/client';

export const themeSchema = Joi.object({
    id: Joi.string().required(),
    logoUrl: Joi.string().required(),
    backgroundColor: Joi.string().required(),
    backgroundUrl: Joi.string().optional(),
    backgroundType: Joi.string().valid(...Object.values(BackgroundType)).required(),
    font: Joi.string().required(),
});

export const formSchema = Joi.object({
    id: Joi.string().required(),
    description: Joi.string().optional(),
    isCaptchaEnabled: Joi.boolean().optional(),
    isEmailCopyOfResponseEnabled: Joi.boolean().optional(),
    isPublished: Joi.boolean().optional(),
    metadata: Joi.object().optional(),
    theme: themeSchema.required()
});

export const choiceSchema = Joi.object({
    id: Joi.string().required(),
    label: Joi.string().required(),
})

export const formFeildPropertySchema = Joi.object({
    id: Joi.string().required(),
    placeholderText: Joi.string().optional(),
    verifySignature: Joi.boolean().optional(),
    choices: Joi.array().items(choiceSchema).optional(),
    allowOtherChoice: Joi.boolean().optional(),
    maxSelectionCount: Joi.number().optional(),
    minSelectionCount: Joi.number().optional(),
    max: Joi.number().optional(),
    min: Joi.number().optional(),
    endLabel: Joi.string().optional(),
    startLabel: Joi.string().optional(),
    numberType: Joi.string().valid(...Object.values(NumberType)).optional(),
    validations: Joi.array().items(...Object.values(ShortTextValidation)).optional(),
})

export const formFeildSchema = Joi.object({
    id: Joi.string().required(),
    required: Joi.boolean().required(),
    title: Joi.string().required(),
    type: Joi.string().valid(...Object.values(FieldType)).required(),
    description: Joi.string().optional(),
    fieldOrder: Joi.number().required(),
    properties: formFeildPropertySchema.optional()
})

export const getFormSchema = Joi.object({
    id: Joi.string().required()
});

export const createFormSchema = Joi.object({
    form: formSchema.required(),
    feilds: Joi.array().items(formFeildSchema).required()
});

export const updateFormSchema = Joi.object({
    form: formSchema.optional(),
    feilds: Joi.array().items(formFeildSchema).optional()
});

export type Form = {
    readonly id: string;
    readonly description?: string;
    readonly isCaptchaEnabled?: boolean;
    readonly isEmailCopyOfResponseEnabled?: boolean;
    readonly isPublished?: boolean;
    readonly metadata?: Record<string, Record<string, string>>;
    readonly theme: Theme
};

export type Theme = {
    readonly id: string;
    readonly logoUrl: string;
    readonly backgroundColor: string;
    readonly backgroundUrl?: string;
    readonly backgroundType: BackgroundType;
    readonly font: string;
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

export type UpdateFormRequestBody = {
    readonly form: Form;
    readonly feilds: FormField[]
};

