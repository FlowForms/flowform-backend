import { executeScript } from '@onflow/flow-cadut';
import { getContractAddresses, getScript, ScriptName } from '../raw';

export const getDeployedContracts = async (address: string) => {
//   // Get the message's transaction code
  const code = getScript(ScriptName.GET_DEPLOYED_CONTRACTS);

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
