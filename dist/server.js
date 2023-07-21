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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const config_1 = __importDefault(require("./config"));
require("./middleware/authentication");
// Flow Config
const fcl = __importStar(require("@onflow/fcl"));
const { accessAPI, flowNetwork } = (0, config_1.default)();
fcl.config().put("accessNode.api", accessAPI);
fcl.config({
    'flow.network': flowNetwork,
    'accessNode.api': accessAPI
});
// Routes
const routes_1 = __importDefault(require("./routes"));
// App Config
const app = (0, express_1.default)();
const port = process.env.PORT;
function setUpParsing(app) {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(express_1.default.text({ type: 'text/html' }));
}
function setUpSecurityHeaders(app) {
    app.use((_, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });
}
const corsOptions = {
    credentials: true,
    origin: true
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)("somesecretkey"));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../../src', 'static', 'provider')));
setUpSecurityHeaders(app);
setUpParsing(app);
// Passport Authentication
app.use((0, cookie_session_1.default)({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["somesecretkey"],
    sameSite: ((0, config_1.default)().environment == 'prod') ? 'none' : 'lax',
    secure: (0, config_1.default)().environment == 'prod',
    domain: ".up.railway.app",
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routes
app.use(routes_1.default);
app.use(error_handler_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log((0, config_1.default)().environment == 'prod', ".up.railway.app", ((0, config_1.default)().environment == 'prod') ? 'none' : 'lax');
    console.log(`Tales FLOW Backend PORT:${port}`, "Set Key 1");
}));
//# sourceMappingURL=server.js.map