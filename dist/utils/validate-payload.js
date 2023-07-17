"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayload = void 0;
const types_1 = require("../types");
function validatePayload(data, schema) {
    const { value, error, warning } = schema.validate(data);
    if (error === undefined && warning === undefined)
        return value;
    console.log(error, warning);
    throw new types_1.Err('INVALID_PAYLOAD', "BAD_REQUEST");
}
exports.validatePayload = validatePayload;
//# sourceMappingURL=validate-payload.js.map