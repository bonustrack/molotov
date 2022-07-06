import { reactive, ref, watch } from 'vue';
import { Wallet } from '@ethersproject/wallet';
import { getInstance } from '@snapshot-labs/lock/plugins/vue3';
import { useWeb3 } from '@/composables/useWeb3';
import { client } from '@/helpers/client';
import { lsGet, lsSet } from '@/helpers/utils';
import { alias as sendAlias } from '@/helpers/molotov';

const { web3Account } = useWeb3();

const voted = ref({});
const aliases = reactive(lsGet('aliases', {}));

watch(web3Account, async () => {
  voted.value = {};
  if (web3Account.value) {
    const result = await client.requestAsync('get_votes', web3Account.value);
    const v = {};
    result.forEach(vote => {
      if (!v[vote.discussion]) v[vote.discussion] = [];
      v[vote.discussion].push(vote.proposal);
    });
    voted.value = v;
  }
});

export function useAccount() {
  async function getAlias() {
    if (aliases[web3Account.value]) {
      return new Wallet(aliases[web3Account.value]);
    } else {
      const alias = Wallet.createRandom();
      const auth = getInstance();
      const receipt = await sendAlias(auth.web3, web3Account.value, {
        from: web3Account.value,
        alias: alias.address,
        created: Math.round(Date.now() / 1e3)
      });
      aliases[web3Account.value] = alias.privateKey;
      console.log('Receipt', receipt);
      lsSet('aliases', aliases);
      return alias;
    }
  }

  return { getAlias, voted, aliases };
}
