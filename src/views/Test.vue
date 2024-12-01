<script setup>
import { onMounted, ref } from 'vue';

const keys = ref([]);

function getKeys() {
  if (typeof window !== 'undefined' && window.ethereum) {
    keys.value = Object.keys(window.ethereum);
  }
}

onMounted(() => getKeys());
</script>

<template>
  <div>
    {{ keys }}
  </div>
</template>
