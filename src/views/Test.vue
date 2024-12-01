<script setup>
import { onMounted, ref } from 'vue';

const keys = ref([]);

function getKeys() {
  keys.value = [];

  if (typeof window !== 'undefined' && window.ethereum) {
    for (const key in window.ethereum) {
      if (
        typeof window.ethereum[key] === 'boolean' &&
        window.ethereum[key] === true
      ) {
        keys.value.push(key);
      }
    }
  }
}

onMounted(() => getKeys());
</script>

<template>
  <div>
    {{ keys }}
  </div>
</template>
