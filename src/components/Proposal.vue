<script setup>
import { shortenAddress, _rt, _n } from '@/helpers/utils';
import { computed } from 'vue';

const props = defineProps({ proposal: Object });

const choices = computed(() =>
  ['1', '2', '3']
    .map(c => {
      return {
        choice: c,
        scores: props.proposal[`scores_${c}`],
        percent:
          (100 / props.proposal.scores_total) * props.proposal[`scores_${c}`]
      };
    })
    .sort((a, b) => b.scores - a.scores)
);
</script>

<template>
  <div class="x-block p-4">
    <p v-text="proposal.body" class="mb-2 text-skin-link" />
    <div class="mb-3">
      <div v-if="choices[0].scores > 0" class="mb-2">
        <span v-if="choices[0].choice === '1'" class="text-green">
          <IH-thumb-up class="inline-block" />
          For {{ _n(choices[0].percent.toFixed(2)) }}%
        </span>
        <span v-if="choices[0].choice === '2'" class="text-red">
          <IH-thumb-down class="inline-block" />
          Against {{ _n(choices[0].percent.toFixed(2)) }}%
        </span>
        <span v-if="choices[0].choice === '3'" class="text-gray-500">
          <IH-fast-forward class="inline-block" />
          Abstain {{ _n(choices[0].percent.toFixed(2)) }}%
        </span>
      </div>
      <div v-else class="mb-2">There isn't any vote yet</div>
      <div class="rounded-full h-[6px] overflow-hidden bg-skin-border">
        <div
          v-for="(choice, i2) in choices"
          :key="i2"
          class="choice-bg float-left h-full"
          :style="{
            width: `${choice.percent.toFixed(3)}%`
          }"
          :class="`_${choice.choice}`"
        />
      </div>
    </div>
    <div>
      <Stamp :id="proposal.author" :size="28" class="mr-1" />
      {{ shortenAddress(proposal.author) }}
      <span v-text="`· ${_rt(proposal.created)}`" />
      <div class="float-right">
        <IH-users class="inline-block mr-1" /> {{ _n(proposal.votes) }}
      </div>
    </div>
  </div>
</template>
