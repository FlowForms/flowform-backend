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
const cadence_1 = require("../cadence");
const router = express_1.default.Router();
router.get('/getCollections', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const collectionName = req.query.key;
        const allCollections = yield (0, cadence_1.getAllCollectionsFromCatalog)();
        if (collectionName == null)
            return res.status(200).send(allCollections);
        const collections = allCollections.filter((data) => {
            const name = data.collectionData.name;
            return name.replace(' ', '').toLowerCase().includes(`${collectionName}`.toLowerCase());
        });
        res.status(200).send(collections);
    });
});
router.get('/getContracts', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const address = req.query.address;
        if (address == null)
            return res.status(200).send();
        const contracts = yield (0, cadence_1.getDeployedContracts)(`${address}`);
        res.status(200).send(contracts.names);
    });
});
router.get('/getFindProfile', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const address = req.query.address;
        if (address == null)
            return res.status(200).send();
        const profile = yield (0, cadence_1.getFindProfile)(`${address}`);
        res.status(200).send(profile);
    });
});
router.get('/getNfts', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const address = req.query.address;
        const publicPath = req.query.publicPath;
        if (address == null && publicPath == null)
            return [];
        const allNfts = yield (0, cadence_1.getNftInCollection)(`${address}`, `${publicPath}`);
        res.status(200).send(allNfts);
    });
});
exports.default = router;
//# sourceMappingURL=script.js.map