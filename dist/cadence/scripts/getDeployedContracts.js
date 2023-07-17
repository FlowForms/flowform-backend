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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeployedContracts = void 0;
const flow_cadut_1 = require("@onflow/flow-cadut");
const raw_1 = require("../raw");
const getDeployedContracts = (address) => __awaiter(void 0, void 0, void 0, function* () {
    //   // Get the message's transaction code
    const code = (0, raw_1.getScript)(raw_1.ScriptName.GET_DEPLOYED_CONTRACTS);
    // Get contract imports addressMap
    const contractAddresses = (0, raw_1.getContractAddresses)();
    // Execute script
    const [result, err] = yield (0, flow_cadut_1.executeScript)({
        code: code,
        addressMap: contractAddresses,
        args: [address]
    });
    console.log(err);
    return result;
});
exports.getDeployedContracts = getDeployedContracts;
//# sourceMappingURL=getDeployedContracts.js.map