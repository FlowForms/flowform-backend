"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractAddresses = exports.getScript = exports.getTransaction = exports.ScriptName = exports.TransactionName = void 0;
const config_1 = __importDefault(require("../../config"));
const txcodes = __importStar(require("./txcodes"));
const scriptCodes = __importStar(require("./scriptcodes"));
var TransactionName;
(function (TransactionName) {
    // SAMPLE NAME
    TransactionName["CREATE_TWEET"] = "CREATE_TWEET";
})(TransactionName = exports.TransactionName || (exports.TransactionName = {}));
var ScriptName;
(function (ScriptName) {
    ScriptName["GET_ALL_COLLECTIONS_FROM_CATALOG"] = "GET_ALL_COLLECTIONS_FROM_CATALOG";
    ScriptName["GET_DEPLOYED_CONTRACTS"] = "GET_DEPLOYED_CONTRACTS";
    ScriptName["GET_NFT_IN_COLLECTION"] = "GET_NFT_IN_COLLECTION";
    ScriptName["GET_FIND_PROFILE"] = "GET_FIND_PROFILE";
})(ScriptName = exports.ScriptName || (exports.ScriptName = {}));
const getTransaction = (name) => {
    const code = Object.values(txcodes).find((value) => Object.keys(txcodes)[Object.values(txcodes).indexOf(value)] === name);
    if (!code) {
        throw new Error(`Transaction code not found for ${name}`);
    }
    return code;
};
exports.getTransaction = getTransaction;
const getScript = (name) => {
    const code = Object.values(scriptCodes).find((value) => Object.keys(scriptCodes)[Object.values(scriptCodes).indexOf(value)] === name);
    if (!code) {
        throw new Error(`Transaction code not found for ${name}`);
    }
    return code;
};
exports.getScript = getScript;
const getContractAddresses = () => {
    const testnetMap = {
        NFTCatalog: (0, config_1.default)().testnet.nftCatalogAddress,
        MetadataViews: (0, config_1.default)().testnet.metadataViewsAddress,
        NonFungibleToken: (0, config_1.default)().testnet.nonFungibleTokenAddress,
        Profile: (0, config_1.default)().testnet.findProfileAddress,
        FIND: (0, config_1.default)().testnet.findAddress
    };
    const mainnetMap = {
        NFTCatalog: (0, config_1.default)().mainnet.nftCatalogAddress,
        MetadataViews: (0, config_1.default)().mainnet.metadataViewsAddress,
        NonFungibleToken: (0, config_1.default)().mainnet.nonFungibleTokenAddress,
        Profile: (0, config_1.default)().mainnet.findProfileAddress,
        FIND: (0, config_1.default)().mainnet.findAddress
    };
    if ((0, config_1.default)().flowNetwork == "testnet")
        return testnetMap;
    else
        return mainnetMap;
};
exports.getContractAddresses = getContractAddresses;
//# sourceMappingURL=index.js.map