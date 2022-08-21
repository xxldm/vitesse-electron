<template>
  <div text-xl mt-6 inline-flex gap-3>
    <el-popover
      placement="top"
    >
      <template #reference>
        <i i-carbon-translate text-2xl />
      </template>
      <template #default>
        <div flex="~ col">
          <el-button v-for="locale in locales" :key="locale.locale" text m="l-0!" :disabled="disabled(locale.locale)" @click="changeLocale(locale.locale)">
            <div v-show="disabled(locale.locale)" i-carbon-checkmark m-r-1 />
            {{ locale.name }}
          </el-button>
        </div>
      </template>
    </el-popover>

    <el-link dark:i-carbon-moon i-carbon-sun text-2xl rel="noopener noreferrer" @click="toggleDark()" />

    <el-link
      i-carbon-logo-github text-2xl rel="noopener noreferrer"
      href="https://github.com/xxldm/vitesse"
      target="_blank"
      title="GitHub"
    />
  </div>
</template>

<script lang="ts" setup>
const locales = [{
  name: "简体中文",
  locale: "zh-cn",
}, {
  name: "English",
  locale: "en",
}];
const i18n = useI18n({ useScope: "global" });
const disabled = (locale: string) => useLocaleStore().locale === locale;
const changeLocale = (locale: string) => {
  useLocaleStore().locale = locale;
  i18n.locale.value = locale;
};
</script>
