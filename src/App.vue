<template>
  <el-config-provider :locale="useLocaleStore().elLocale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();
useHead({
  title: computed(() => {
    if (!route.name) {
      return t("appName");
    }
    return `${t(`menu.${route.name.toString()}`)} - ${t("appName")}`;
  }),
  htmlAttrs: {
    // 后续修改lang属性,好像不会触发浏览器的翻译功能
    lang: computed(() => useLocaleStore().locale),
  },
});
</script>
