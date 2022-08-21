<template>
  <div text-center>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      {{ t("menu.hi") }}, {{ name }}
    </p>
    <p text-sm op50>
      <em>{{ t("dynamic-route") }}</em>
    </p>
    <el-button
      type="primary"
      @click="router.back()"
    >
      {{ t('back') }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
const name = useRouteParams("name");
const router = useRouter();
const { t } = useI18n();
</script>

<route lang="yaml">
name: hi
meta:
  hidder: true
</route>
