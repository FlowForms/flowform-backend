import { Magic } from '@magic-sdk/admin';

export const ACCESS_NODE_URLS: Record<string, string> = {
  'local': 'http://localhost:8080',
  'testnet': 'https://rest-testnet.onflow.org',
  'mainnet': 'https://rest-mainnet.onflow.org'
}

export const BLOCK_EXPLORER_URLS = {
  'testnet': 'https://testnet.flowscan.org',
  'mainnet': 'https://flowscan.org'
}

export const magic = new Magic('sk_live_8FB8BC7ABF165BC7');
