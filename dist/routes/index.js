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
const auth_1 = require("../utils/auth");
const auth_2 = __importDefault(require("./auth"));
const responder_auth_1 = __importDefault(require("./responder-auth"));
const form_1 = __importDefault(require("./form"));
const script_1 = __importDefault(require("./script"));
const response_1 = __importDefault(require("./response"));
const types_1 = require("../types");
const validate_payload_1 = require("../utils/validate-payload");
const db_1 = require("../db/db");
const router = express_1.default.Router();
router.use('/auth', auth_2.default);
router.use('/responder-auth', responder_auth_1.default);
router.use('/form', auth_1.checkAuthenticated, form_1.default);
router.get('/view-form/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = (0, validate_payload_1.validatePayload)({ id: req.params.id }, types_1.getFormSchema);
        const form = yield db_1.db.form.get(id);
        delete form["response"];
        return res.status(200).send(form);
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
}));
router.use('/script', script_1.default);
router.use('/response', response_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map