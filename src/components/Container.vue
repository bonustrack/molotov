<script setup>
defineProps({ slim: Boolean });
</script>
<template>
  <div :class="slim ? 'px-0 sm:px-4' : 'px-4'" class="max-w-screen-md mx-auto">
    <slot />
  </div>
</template>
