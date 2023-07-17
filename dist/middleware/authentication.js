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
const passport_1 = __importDefault(require("passport"));
const passport_magic_1 = require("passport-magic");
const passport_twitter_oauth2_1 = require("@superfaceai/passport-twitter-oauth2");
const db_1 = require("../db/db");
const types_1 = require("../types");
const constants_1 = require("../constants");
const config_1 = __importDefault(require("../config"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//Use the Twitter OAuth2 strategy within Passport
passport_1.default.use(
// <2> Strategy initialization
new passport_twitter_oauth2_1.Strategy({
    clientID: (0, config_1.default)().twitterClientID,
    clientSecret: (0, config_1.default)().twitterClientSecret,
    clientType: 'confidential',
    callbackURL: '/responder-auth/twitter/callback',
}, 
// <3> Verify callback
(accessToken, refreshToken, profile, done) => {
    console.log('Success!', { accessToken, refreshToken });
    return done(null, {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName
    });
}));
const strategy = new passport_magic_1.Strategy(function (user, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const userMetadata = yield constants_1.magic.users.getMetadataByIssuer(user.issuer);
        const existingUser = yield db_1.db.account.getByIssuer(user.issuer);
        if (!existingUser)
            signup(user, userMetadata, done);
        else
            login(user, existingUser, done);
    });
});
const signup = (user, userMetadata, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield db_1.db.account.create({
            accountAddress: userMetadata.publicAddress,
            email: userMetadata.email,
            issuer: userMetadata.issuer,
            lastLoginAt: user.claim.iat,
        });
        return done(null, {
            accountAddress: newUser.accountAddress,
            email: newUser.email,
            issuer: newUser.issuer,
        });
    }
    catch (e) {
        return done(new types_1.Err(`Signup Failed : ${e}`, 'INTERNAL_SERVER'), null);
    }
});
const login = (user, account, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user.claim.iat <= account.lastLoginAt) {
            return done(null, false, {
                message: `Replay attack detected for user ${user.issuer}}.`,
            });
        }
        const updatedUser = yield db_1.db.account.update(account.email, { lastLoginAt: user.claim.iat });
        return done(null, {
            accountAddress: updatedUser.accountAddress,
            email: updatedUser.email,
            issuer: updatedUser.issuer,
        });
    }
    catch (e) {
        return done(new types_1.Err(`Login failed : ${e}`, 'INTERNAL_SERVER'), null);
    }
});
passport_1.default.use(strategy);
//# sourceMappingURL=authentication.js.map