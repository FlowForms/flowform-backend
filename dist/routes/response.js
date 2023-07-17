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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_payload_1 = require("../utils/validate-payload");
const form_1 = require("../types/models/form");
const db_1 = require("../db/db");
const router = express_1.default.Router();
router.post('/create', function ({ body }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { formId, data } = (0, validate_payload_1.validatePayload)(body, form_1.createResponseSchema);
            yield db_1.db.response.create(formId, data);
            return res.status(200).send("Response Submitted Successfully");
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    });
});
exports.default = router;
//# sourceMappingURL=response.js.map