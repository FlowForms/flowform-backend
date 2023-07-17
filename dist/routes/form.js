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
router.get('/getAll', function ({ user }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const forms = yield db_1.db.form.getAll(user.accountAddress);
            return res.status(200).send(forms);
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    });
});
router.get('/get/:id', function ({ params }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = (0, validate_payload_1.validatePayload)({ id: params.id }, form_1.getFormSchema);
            const form = yield db_1.db.form.get(id);
            return res.status(200).send(form);
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    });
});
router.post('/create', function ({ body, user }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { form: formData, feilds } = (0, validate_payload_1.validatePayload)(body, form_1.createFormSchema);
            yield db_1.db.form.create(user.accountAddress, formData);
            yield db_1.db.feild.createMany(formData.id, feilds);
            const form = yield db_1.db.form.get(formData.id);
            return res.status(200).send(form);
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    });
});
router.post('/update', function ({ body, user }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, form: formData, feilds } = (0, validate_payload_1.validatePayload)({
                id: body.id,
                form: Object.assign({ id: body.id }, body.form),
                feilds: body.feilds
            }, form_1.updateFormSchema);
            if (formData)
                yield db_1.db.form.upsert(user.accountAddress, formData);
            if (feilds)
                yield db_1.db.feild.updateMany(id, feilds);
            const form = yield db_1.db.form.get(id);
            return res.status(200).send(form);
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    });
});
router.get('/delete/:id', function ({ params, user }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = (0, validate_payload_1.validatePayload)({ id: params.id }, form_1.getFormSchema);
            yield db_1.db.form.delete(id, user.accountAddress);
            return res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    });
});
exports.default = router;
//# sourceMappingURL=form.js.map