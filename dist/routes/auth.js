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
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../utils/auth");
const constants_1 = require("../constants");
const router = express_1.default.Router();
router.post('/login/google', passport_1.default.authenticate('magic'), function (req, res) {
    console.log("Check : ", req.user);
    res.cookie('check', JSON.stringify(req.user));
    return res.sendStatus(200);
});
router.get('/user', auth_1.checkAuthenticated, function (req, res) {
    return res.status(200).send(req.user);
});
// Logout User
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.isAuthenticated()) {
            yield constants_1.magic.users.logoutByIssuer(req.user.issuer);
            req.logout();
            return res.status(200).end();
        }
        else {
            return res.status(401).end(`User is not logged in.`);
        }
    }
    catch (e) {
        req.logout();
        return res.status(401).end(`User is not logged in.`);
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map