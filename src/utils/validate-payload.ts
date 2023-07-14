import Joi from "joi";
import { Err } from "../types";

export function validatePayload(data: any, schema: Joi.ObjectSchema<any>) {
    const { value, error, warning } = schema.validate(data);
    if (error === undefined && warning === undefined) return value;
    console.log(error, warning)
    throw new Err('INVALID_PAYLOAD', "BAD_REQUEST");
}
  