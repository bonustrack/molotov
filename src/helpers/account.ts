import { Wallet } from '@ethersproject/wallet';

export const account = Wallet.createRandom();
console.log('Public key', account.address);
