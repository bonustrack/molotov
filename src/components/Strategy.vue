<script setup>
import { ref } from 'vue';

const props = defineProps({ modelValue: String });

const input = ref(props.modelValue || 'address');
const modalOpen = ref(false);
</script>

<template>
  <div>
    <a @click="modalOpen = true" class="x-block mb-3 px-4 py-3 text-skin-link">
      <template v-if="input === 'address'">
        <IH-user class="inline-block mr-1" />
        Everyone get 1 voting power
      </template>
      <template v-if="input === 'erc20'">
        <IH-stop class="inline-block mr-1" />
        Each ERC20 get 1 voting power
      </template>
      <template v-if="input === 'nft'">
        <IH-photograph class="inline-block mr-1" />
        Each NFT get 1 voting power
      </template>
      <IH-pencil class="inline-block float-right" />
    </a>
    <teleport to="#modal">
      <ModalStrategy
        v-model="input"
        :open="modalOpen"
        @close="modalOpen = false"
      />
    </teleport>
  </div>
</template>
