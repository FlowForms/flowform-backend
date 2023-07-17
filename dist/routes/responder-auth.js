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
const router = express_1.default.Router();
router.get('/user', function (req, res) {
    if (!req.user)
        res.status(200).send(null);
    if (req.user && req.user.issuer)
        res.status(200).send(null);
    return res.status(200).send(req.user);
});
// Twitter Viewer Login
router.get('/twitter', passport_1.default.authenticate('twitter', {
    // <6> Scopes
    scope: ['tweet.read', 'users.read', 'offline.access', 'follows.read'],
}));
// <7> Callback handler
router.get('/twitter/callback', passport_1.default.authenticate('twitter'), function (req, res) {
    const userData = JSON.stringify(req.user, undefined, 2);
    res.end(`<h1>Authentication succeeded</h1> User data: <pre>${userData}</pre>`);
});
// Logout User
router.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout();
    return res.status(200).end();
}));
exports.default = router;
//# sourceMappingURL=responder-auth.js.map