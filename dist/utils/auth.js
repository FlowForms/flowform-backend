"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthenticated = void 0;
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.user.issuer) {
        return next();
    }
    return res.status(401).send("401 Unauthorized");
};
exports.checkAuthenticated = checkAuthenticated;
//# sourceMappingURL=auth.js.map