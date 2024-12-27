<script setup>
import { onMounted, ref } from 'vue';
import { client } from '@/helpers/client';
import { shortenAddress, _rt } from '@/helpers/utils';

const discussions = ref([]);
const loaded = ref(false);

onMounted(async () => {
  discussions.value = await client.requestAsync('get_discussions', null);
  loaded.value = true;
});
</script>

<template>
  <div>
    <div class="py-8 mb-6 border-b hero bg-purple-700">
      <Container>
        <h1 class="my-5 mono text-white">
          Think together,<br />
          Spark change.
        </h1>
      </Container>
    </div>
    <Container>
      <Discuss class="mb-4" />
      <h3 v-text="'Last discussions'" class="mb-2" />
      <UiLoading v-if="!loaded" class="block mb-2" />
      <div v-else>
        <div v-if="discussions.length === 0">
          There isn't any discussion yet.
        </div>
        <router-link
          v-for="discussion in discussions"
          :key="discussion.id"
          :to="{ name: 'discussion', params: { id: discussion.id } }"
        >
          <div class="x-block mb-3 p-4">
            <h3 v-text="discussion.title" class="mb-2" />
            <div>
              <Stamp :id="discussion.author" :size="28" class="mr-1" />
              {{ shortenAddress(discussion.author) }}
              <span v-text="`· ${_rt(discussion.created)}`" />
            </div>
          </div>
        </router-link>
      </div>
    </Container>
  </div>
</template>
