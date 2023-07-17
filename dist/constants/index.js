"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.magic = exports.BLOCK_EXPLORER_URLS = exports.ACCESS_NODE_URLS = void 0;
const admin_1 = require("@magic-sdk/admin");
exports.ACCESS_NODE_URLS = {
    'local': 'http://localhost:8080',
    'testnet': 'https://rest-testnet.onflow.org',
    'mainnet': 'https://rest-mainnet.onflow.org'
};
exports.BLOCK_EXPLORER_URLS = {
    'testnet': 'https://testnet.flowscan.org',
    'mainnet': 'https://flowscan.org'
};
exports.magic = new admin_1.Magic('sk_live_8FB8BC7ABF165BC7');
//# sourceMappingURL=index.js.map