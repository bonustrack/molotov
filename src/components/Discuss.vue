<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const input = ref('');

async function handleDiscuss() {
  await router.push({ name: 'start', query: { title: input.value } });
}
</script>
<template>
  <form @submit.prevent="handleDiscuss" class="s-box relative">
    <div class="s-base">
      <SIString
        v-model="input"
        :definition="{
          type: 'string',
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
