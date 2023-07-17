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
exports.signer = void 0;
const fcl_1 = require("@onflow/fcl");
const sha3_1 = require("sha3");
const elliptic_1 = __importDefault(require("elliptic"));
const config_1 = __importDefault(require("../config"));
const curve = new elliptic_1.default.ec("p256");
const hashMessageHex = (msgHex) => {
    const sha = new sha3_1.SHA3(256);
    sha.update(Buffer.from(msgHex, "hex"));
    return sha.digest();
};
const signWithKey = (privateKey, msgHex) => {
    const key = curve.keyFromPrivate(Buffer.from(privateKey, "hex"));
    const sig = key.sign(hashMessageHex(msgHex));
    const n = 32;
    const r = sig.r.toArrayLike(Buffer, "be", n);
    const s = sig.s.toArrayLike(Buffer, "be", n);
    return Buffer.concat([r, s]).toString("hex");
};
const signer = (account) => __awaiter(void 0, void 0, void 0, function* () {
    // We are hard coding these values here, but you can pass those values from outside as well.
    // For example, you can create curried function:
    // const signer = (keyId, accountAdddress, pkey) => (accouint) => {...}
    // and then create multiple signers for different key indices
    const keyId = (0, config_1.default)().adminKeyIndex;
    const accountAddress = (0, config_1.default)().adminAddress;
    const pkey = (0, config_1.default)().adminPrivateKeyHex;
    // authorization function need to return an account
    return Object.assign(Object.assign({}, account), { tempId: `${accountAddress}-${keyId}`, addr: (0, fcl_1.sansPrefix)(accountAddress), keyId: Number(keyId), signingFunction: (signable) => __awaiter(void 0, void 0, void 0, function* () {
            // Singing functions are passed a signable and need to return a composite signature
            // signable.message is a hex string of what needs to be signed.
            const signature = yield signWithKey(pkey, signable.message);
            return {
                addr: (0, fcl_1.withPrefix)(accountAddress),
                keyId: Number(keyId),
                signature // this needs to be a hex string of the signature, where signable.message is the hex value that needs to be signed
            };
        }) });
});
exports.signer = signer;
//# sourceMappingURL=authz-functions.js.map