<template>
  <div text-center>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <el-link rel="noopener noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        {{ $t('vitesse') }}
      </el-link>
    </p>
    <p>
      <em text-sm op75>{{ $t('zi-yong-de-vite-ru-men-mo-ban') }}</em>
    </p>

    <div py-4 />
    <div w-60 mx-auto>
      <el-input
        v-model="name"
        :placeholder="$t('shu-ru-ni-de-ming-zi')"
        type="text"
        autocomplete="false"
        @keydown.enter="go"
      />
    </div>
    <div>
      <el-button
        type="primary"
        class="m-3 text-sm"
        :disabled="!name"
        @click="go"
      >
        {{ $t('go') }}
      </el-button>
    </div>
    <el-calendar />
    <el-pagination :total="100" />
  </div>
</template>

<script setup lang="ts">
const name = $ref("");

const router = useRouter();
const go = () => {
  if (name) {
    router.push(`/hi/${encodeURIComponent(name)}`);
  }
};
</script>

<route lang="yaml">
name: main
</route>
