import { client } from '@/helpers/client';
import {
  domain,
  aliasTypes,
  discussTypes,
  proposeTypes,
  voteTypes,
  Alias,
  Discuss,
  Propose,
  Vote
} from '@/helpers/molotov/types';

export async function alias(web3, address, message: Alias) {
  return await send(web3, address, 'alias', message, aliasTypes);
}

export async function discuss(web3, address, message: Discuss) {
  return await send(web3, address, 'discuss', message, discussTypes);
}

export async function propose(web3, address, message: Propose) {
  return await send(web3, address, 'propose', message, proposeTypes);
}

export async function vote(web3, address, message: Vote) {
  return await send(web3, address, 'vote', message, voteTypes);
}

async function send(web3, address, action, message, types) {
  const signer = web3?.getSigner ? web3.getSigner() : web3;
  const data: any = { domain, types, message };
  try {
    const sig = await signer._signTypedData(domain, data.types, message);
    const envelop = { address, sig, data };
    return await client.requestAsync(action, envelop);
  } catch (e) {
    return Promise.reject(e);
  }
}
