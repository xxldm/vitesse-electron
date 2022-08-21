import type { Language } from "element-plus/es/locale";
import en from "element-plus/lib/locale/lang/en";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import { defaultLocale } from "~/modules/i18n";

const elLocales: { [key: string]: Language } = {
  [zhCn.name]: zhCn,
  en,
};

export const useLocaleStore = defineStore("my-locale", () => {
  const locale = useLocalStorage("locale", defaultLocale);
  const elLocale = computed(() => elLocales[locale.value]);
  return {
    locale,
    elLocale,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot));
}
