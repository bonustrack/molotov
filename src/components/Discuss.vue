<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWeb3 } from '@/composables/useWeb3';
import { discuss } from '@/helpers/molotov';
import { account } from '@/helpers/account';

const router = useRouter();
const { web3 } = useWeb3();

const input = ref('');
const body = ref('');

async function handleDiscuss() {
  const receipt = await discuss(account, account.address, {
    from: web3.value.account,
    title: input.value,
    body: body.value,
    created: Math.round(Date.now() / 1e3)
  });
  console.log('Receipt', receipt);
  await router.push({ name: 'discussion', params: { id: receipt.id } });
}
</script>
<template>
  <form @submit.prevent="handleDiscuss" class="s-box relative">
    <div class="s-base">
      <SIString
        v-model="input"
        :definition="{
          type: 'string',
          title: 'Discuss',
          examples: ['Start a discussion']
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
</template>
