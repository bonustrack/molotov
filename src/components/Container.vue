<script setup>
defineProps({ slim: Boolean });
</script>
<template>
  <div :class="slim ? 'px-0 sm:px-4' : 'px-4'" class="max-w-[760px] mx-auto">
    <slot />
  </div>
</template>
