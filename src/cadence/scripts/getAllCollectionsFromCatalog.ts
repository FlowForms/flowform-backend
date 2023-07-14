import { executeScript } from '@onflow/flow-cadut';
import { getContractAddresses, getScript, ScriptName } from '../raw';


export const getAllCollectionsFromCatalog = async () => {
//   // Get the message's transaction code
  const code = getScript(ScriptName.GET_ALL_COLLECTIONS_FROM_CATALOG);

  // Get contract imports addressMap
  const contractAddresses = getContractAddresses();

  // Execute script
  const [result, err] = await executeScript({
    code: code,
    addressMap: contractAddresses,
  });
  
  console.log(err)
  return result
};
