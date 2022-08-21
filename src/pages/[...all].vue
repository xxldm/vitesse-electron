<template>
  <el-result :title="t('error.PageNotFound')">
    <template #icon>
      <img w-80 h-80 src="/NotFound.jpg">
    </template>
    <template #extra>
      <router-link to="/">
        <el-button type="primary">
          {{ t("menu.goMain") }}
        </el-button>
      </router-link>
    </template>
  </el-result>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>

<route lang="yaml">
name: error.PageNotFound
meta:
  layout: blank
  hidder: true
</route>
