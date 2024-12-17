<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWeb3 } from '@/composables/useWeb3';
import { useModal } from '@/composables/useModal';
import { useAccount } from '@/composables/useAccount';
import { discuss } from '@/helpers/molotov';

const route = useRoute();
const router = useRouter();
const { web3Account } = useWeb3();
const { modalAccountOpen } = useModal();
const { getAlias } = useAccount();

const title = ref(route.query.title || '');
const body = ref('');
const canVote = ref('any');
const canPropose = ref('any');
const votingPower = ref('address');

async function handleDiscuss() {
  if (!title.value) return;
  if (!web3Account.value) return (modalAccountOpen.value = true);
  const alias = await getAlias();
  const receipt = await discuss(alias, alias.address, {
    from: web3Account.value,
    title: title.value,
    body: body.value,
    created: Math.round(Date.now() / 1e3)
  });
  console.log('Receipt', receipt);
  await router.push({ name: 'discussion', params: { id: receipt.id } });
}
</script>

<template>
  <form @submit.prevent="handleDiscuss">
    <div
      class="fixed top-0 border-b w-full px-4 py-3 bg-skin-bg flex h-[79px] z-20"
    >
      <div class="flex-auto space-x-2">
        <router-link :to="{ name: 'home' }" class="mr-2">
          <UiButton class="leading-3 w-[46px] !px-0">
            <IH-arrow-narrow-left class="inline-block" />
          </UiButton>
        </router-link>
        <h4 class="py-2 inline-block">Start a discussion</h4>
      </div>
      <UiButton type="submit" class="leading-3">
        <span v-text="'Publish'" class="hidden mr-2 md:inline-block" />
        <IH-paper-airplane class="inline-block rotate-90" />
      </UiButton>
    </div>
    <Container class="pt-5">
      <div class="s-box mb-4">
        <SIString
          v-model="title"
          :definition="{
            type: 'string',
            title: 'Title',
            examples: [`What's the topic of the discussion?`]
          }"
          class="text-lg font-normal"
        />
        <div class="s-label">About</div>
        <textarea
          v-model="body"
          class="s-input h-[160px]"
          placeholder="Say more about the discussion"
        />
      </div>

      <h3 v-text="'How voting power works?'" class="mb-2" />
      <Strategy v-model="votingPower" />

      <h3 v-text="'Who can vote?'" class="mb-2" />
      <Validation v-model="canVote" />

      <h3 v-text="'Who can add statement?'" class="mb-2" />
      <Validation v-model="canPropose" />
    </Container>
  </form>
</template>
