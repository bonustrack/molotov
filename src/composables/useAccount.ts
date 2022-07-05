import { ref, watch } from 'vue';
import { useWeb3 } from '@/composables/useWeb3';
import { client } from '@/helpers/client';

const { web3Account } = useWeb3();

const voted = ref({});

watch(web3Account, async () => {
  voted.value = {};
  if (web3Account.value) {
    console.log('Account changed to', web3Account.value);
    const result = await client.requestAsync('get_votes', web3Account.value);
    const v = {};
    result.forEach(vote => {
      if (!v[vote.discussion]) v[vote.discussion] = [];
      v[vote.discussion].push(vote.proposal);
    });
    console.log('Voted', v);
    voted.value = v;
  }
});

export function useAccount() {
  return { voted };
}
