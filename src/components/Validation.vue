<script setup>
import { ref } from 'vue';

const props = defineProps({ modelValue: String });

const input = ref(props.modelValue || 'any');
const modalOpen = ref(false);
</script>

<template>
  <div>
    <a @click="modalOpen = true" class="x-block mb-3 px-4 py-3 text-skin-link">
      <template v-if="input === 'any'">
        <IH-globe class="inline-block mr-1" />
        Anyone
      </template>
      <template v-if="input === 'erc20'">
        <IH-stop class="inline-block mr-1" />
        ERC20 with threshold
      </template>
      <template v-if="input === 'nft'">
        <IH-photograph class="inline-block mr-1" />
        NFT with threshold
      </template>
      <IH-pencil class="float-right" />
    </a>
    <teleport to="#modal">
      <ModalValidation
        v-model="input"
        :open="modalOpen"
        @close="modalOpen = false"
      />
    </teleport>
  </div>
</template>
