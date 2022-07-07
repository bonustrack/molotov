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
      <h3 v-text="'Select strategy'" />
    </template>
    <div class="m-4 x-block">
      <a @click="handleSelect('address')" class="py-3 px-4 border-b block">
        <IH-user class="inline-block mr-1" />
        Everyone get 1 voting power
      </a>
      <a @click="handleSelect('erc20')" class="py-3 px-4 border-b block">
        <IH-stop class="inline-block mr-1" />
        Each ERC20 get 1 voting power
      </a>
      <a @click="handleSelect('nft')" class="py-3 px-4 block">
        <IH-photograph class="inline-block mr-1" />
        Each NFT get 1 voting power
      </a>
    </div>
  </UiModal>
</template>
