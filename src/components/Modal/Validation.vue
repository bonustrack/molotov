<script setup>
const props = defineProps({ modelValue: String, open: Boolean });
const emit = defineEmits(['update:modelValue', 'close']);

function handleSelect(type) {
  emit('update:modelValue', type);
  emit('close');
}
</script>

<template>
  <UiModal :open="open" @close="$emit('close')">
    <template v-slot:header>
      <h3 v-text="'Select validation'" />
    </template>
    <div class="m-4 x-block">
      <a @click="handleSelect('any')" class="py-3 px-4 border-b block">
        <IH-globe class="inline-block mr-1" />
        Anyone
      </a>
      <a @click="handleSelect('erc20')" class="py-3 px-4 border-b block">
        <IH-stop class="inline-block mr-1" />
        ERC20 with threshold
      </a>
      <a @click="handleSelect('nft')" class="py-3 px-4 block">
        <IH-photograph class="inline-block mr-1" />
        NFT with threshold
      </a>
    </div>
  </UiModal>
</template>
