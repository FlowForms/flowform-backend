import config from '../config';
import { sign } from './crypto';

export function adminAuthorizationFunction(account: any) {
  const address = config().adminAddress;
  const keyIndex = config().adminKeyIndex;
  const privateKey = config().adminPrivateKeyHex ?? '';
  return {
    ...account, // bunch of defaults in here, we want to overload some of them though
    tempId: `${address}-${keyIndex}`, // tempIds are more of an advanced topic, for 99% of the times where you know the address and keyId you will want it to be a unique string per that address and keyId
    addr: address, // the address of the signatory
    keyId: Number(keyIndex), // this is the keyId for the accounts registered key that will be used to sign, make extra sure this is a number and not a string
    signingFunction: async (signable: any) => {
      // Singing functions are passed a signable and need to return a composite signature
      // signable.message is a hex string of what needs to be signed.

      const signature = await sign(signable.message, privateKey);

      return {
        addr: address, // needs to be the same as the account.addr
        keyId: Number(keyIndex), // needs to be the same as account.keyId, once again make sure its a number and not a string
        // signature: await sign(signable.message, privateKey), // this needs to be a hex string of the signature, where signable.message is the hex value that needs to be signed
        signature,
      };
    },
  };
}

export function userAuthorizationFunction(privateKey: string, keyIndex: string, address: string) {
  return async function (account: any) {
    // authorization function need to return an account

    return {
      ...account, // bunch of defaults in here, we want to overload some of them though
      tempId: `${address}-${keyIndex}`, // tempIds are more of an advanced topic, for 99% of the times where you know the address and keyId you will want it to be a unique string per that address and keyId
      addr: address, // the address of the signatory
      keyId: Number(keyIndex), // this is the keyId for the accounts registered key that will be used to sign, make extra sure this is a number and not a string
      signingFunction: async (signable: any) => {
        // Singing functions are passed a signable and need to return a composite signature
        // signable.message is a hex string of what needs to be signed.

        const signature = await sign(signable.message, privateKey);

        return {
          addr: address, // needs to be the same as the account.addr
          keyId: Number(keyIndex), // needs to be the same as account.keyId, once again make sure its a number and not a string
          // signature: await sign(signable.message, privateKey), // this needs to be a hex string of the signature, where signable.message is the hex value that needs to be signed
          signature,
        };
      },
    };
  };
}
