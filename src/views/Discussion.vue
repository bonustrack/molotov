<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useWeb3 } from '@/composables/useWeb3';
import { shortenAddress, _rt, _n } from '@/helpers/utils';
import { propose, vote } from '@/helpers/molotov';
import { client } from '@/helpers/client';
import { useAccount } from '@/composables/useAccount';
import { useModal } from '@/composables/useModal';

const route = useRoute();
const { web3Account } = useWeb3();
const { voted, getAlias } = useAccount();
const { modalAccountOpen } = useModal();

const id = route.params.id;

const tab = ref('results');
const loaded = ref(false);
const loading = ref(false);
const discussion = ref({});
const proposals = ref([]);
const voters = ref([]);
const input = ref('');

const pending = computed(() =>
  proposals.value
    .filter(
      proposal =>
        !(voted.value[proposal.discussion] || []).includes(proposal.id)
    )
    .sort((a, b) => a.votes - b.votes)
);

onMounted(async () => {
  const result = await Promise.all([
    client.requestAsync('get_discussion', id),
    client.requestAsync('get_proposals', id),
    client.requestAsync('get_voters', id)
  ]);
  discussion.value = result[0];
  proposals.value = result[1];
  voters.value = result[2];
  loaded.value = true;
});

async function handleVote(proposal, choice) {
  if (!web3Account.value) return (modalAccountOpen.value = true);
  loading.value = true;
  const alias = await getAlias();
  const receipt = await vote(alias, alias.address, {
    from: web3Account.value,
    discussion: id,
    proposal,
    choice,
    created: Math.round(Date.now() / 1e3)
  });
  if (!voted.value[id]) voted.value[id] = [];
  voted.value[id].push(proposal);
  console.log('Receipt', receipt);
  loading.value = false;
  proposals.value = await client.requestAsync('get_proposals', id);
  voters.value = await client.requestAsync('get_voters', id);
}

async function handlePropose() {
  if (!input.value) return;
  if (!web3Account.value) return (modalAccountOpen.value = true);
  const alias = await getAlias();
  const receipt = await propose(alias, alias.address, {
    from: web3Account.value,
    discussion: id,
    body: input.value,
    created: Math.round(Date.now() / 1e3)
  });
  console.log('Receipt', receipt);
  input.value = '';
  proposals.value = await client.requestAsync('get_proposals', id);
  voters.value = await client.requestAsync('get_voters', id);
}
</script>

<template>
  <Container class="pt-5">
    <div v-if="!loaded">
      <UiLoading />
    </div>
    <div v-else class="space-y-4">
      <h1 v-text="discussion.title" class="text-[38px]" />
      <div>
        <Stamp :id="discussion.author" :size="28" class="mr-1" />
        {{ shortenAddress(discussion.author) }}
        <span v-text="`· ${_rt(discussion.created)}`" />
      </div>
      <p v-if="discussion.body" v-text="discussion.body" />

      <form @submit.prevent="handlePropose" class="s-box relative">
        <div class="s-base">
          <SIString
            v-model="input"
            :definition="{
              type: 'string',
              examples: ['Add a statement']
            }"
            class="text-lg font-normal"
          />
          <UiButton
            type="submit"
            class="w-[46px] !px-0 right-4 top-2 absolute border-skin-link bg-transparent"
          >
            <IH-paper-airplane class="inline-block rotate-90" />
          </UiButton>
        </div>
      </form>

      <div v-if="pending[0]">
        <div class="space-x-1 mb-3">
          <span
            class="!w-[28px] !h-[28px] bg-skin-link text-skin-bg inline-block rounded-full text-center"
          >
            <b>{{ _n(pending.length) }}</b>
          </span>
          <span class="text-md">pending statement(s)</span>
          <div v-if="loading" class="float-right">
            <UiLoading />
          </div>
        </div>
        <div class="x-block p-4">
          <p v-text="pending[0].body" class="mb-2 text-skin-link" />
          <div class="space-x-2 mb-3">
            <UiButton
              @click="handleVote(pending[0].id, 1)"
              class="!text-green !border-green w-[46px] !px-0"
            >
              <IH-thumb-up class="inline-block" />
            </UiButton>
            <UiButton
              @click="handleVote(pending[0].id, 2)"
              class="!text-red !border-red w-[46px] !px-0"
            >
              <IH-thumb-down class="inline-block" />
            </UiButton>
            <UiButton
              @click="handleVote(pending[0].id, 3)"
              class="!text-gray-500 !border-gray-500 w-[46px] !px-0"
            >
              <IH-fast-forward class="inline-block" />
            </UiButton>
          </div>
          <div>
            <Stamp :id="pending[0].author" :size="28" class="mr-1" />
            {{ shortenAddress(pending[0].author) }}
            <span v-text="`· ${_rt(pending[0].created)}`" />
            <div class="float-right">
              <IH-users class="inline-block mr-1" />
              {{ _n(pending[0].votes) }}
            </div>
          </div>
        </div>
        <div class="mb-2">
          <div
            v-if="pending[1]"
            class="rounded-b-xl h-[6px] border-b border-x mx-[8px]"
          />
          <div
            v-if="pending[2]"
            class="rounded-b-xl h-[6px] border-b border-x mx-[16px]"
          />
        </div>
      </div>

      <div class="pt-4">
        <div class="space-x-6">
          <a
            @click="tab = 'results'"
            class="inline-block py-2 text-skin-text"
            :class="tab === 'results' && 'border-b-[3px] text-skin-link'"
          >
            <IH-chart-bar class="inline-block mr-1" /> Results
          </a>
          <a
            @click="tab = 'voters'"
            class="inline-block py-2 text-skin-text"
            :class="tab === 'voters' && 'border-b-[3px] text-skin-link'"
          >
            <IH-users class="inline-block mr-1" /> Voters
          </a>
        </div>
      </div>
      <div v-if="tab === 'results'" class="space-y-3">
        <div v-if="proposals.length === 0">There isn't any statement yet.</div>
        <Proposal
          v-for="(proposal, i) in proposals"
          :proposal="proposal"
          :key="i"
        />
      </div>
      <div v-if="tab === 'voters'">
        <div>
          <div v-if="voters.length === 0">There isn't any vote yet.</div>
          <Stamp
            v-for="(voter, i) in voters"
            :key="i"
            :id="voter.voter"
            :size="28"
            class="inline-block mr-2 mb-2"
          />
        </div>
      </div>
    </div>
  </Container>
</template>
