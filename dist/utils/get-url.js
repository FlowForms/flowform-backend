"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = void 0;
function getUrl() {
    return process.env.NEXT_PUBLIC_VERCEL_URL
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : 'http://localhost:' + process.env.NEXT_PUBLIC_PORT;
}
exports.getUrl = getUrl;
//# sourceMappingURL=get-url.js.map