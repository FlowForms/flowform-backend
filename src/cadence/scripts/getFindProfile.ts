import { executeScript, setEnvironment } from '@onflow/flow-cadut';
import { getContractAddresses, getScript, ScriptName, } from '../raw';

export const getFindProfile = async (address: string) => {
    // Get the message's transaction code
    const code = getScript(ScriptName.GET_FIND_PROFILE);

    // Get contract imports addressMap
    const contractAddresses = getContractAddresses();

    // Execute script
    const [result, err] = await executeScript({
        code: code,
        addressMap: contractAddresses,
        args: [address]
    });

    console.log(err)
    return result
};
