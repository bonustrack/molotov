import { name } from '../../../package.json';

export const domain = {
  name,
  version: '1',
  chainId: 1
};

export const aliasTypes = {
  Alias: [
    { name: 'from', type: 'address' },
    { name: 'alias', type: 'address' }
  ]
};

export const discussTypes = {
  Discuss: [
    { name: 'from', type: 'address' },
    { name: 'title', type: 'string' },
    { name: 'body', type: 'string' },
    { name: 'created', type: 'uint32' }
  ]
};

export const proposeTypes = {
  Propose: [
    { name: 'from', type: 'address' },
    { name: 'discussion', type: 'string' },
    { name: 'body', type: 'string' },
    { name: 'created', type: 'uint32' }
  ]
};

export const voteTypes = {
  Vote: [
    { name: 'from', type: 'address' },
    { name: 'discussion', type: 'bytes32' },
    { name: 'proposal', type: 'bytes32' },
    { name: 'choice', type: 'uint32' },
    { name: 'created', type: 'uint32' }
  ]
};

export interface Alias {
  from: string;
  alias: string;
  created: number;
}

export interface Discuss {
  from: string;
  title: string;
  body: string;
  created: number;
}

export interface Propose {
  from: string;
  discussion: string;
  body: string;
  created: number;
}

export interface Vote {
  from: string;
  discussion: string;
  proposal: string;
  choice: number;
  created: number;
}
