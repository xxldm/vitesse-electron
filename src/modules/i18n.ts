import { createI18n } from "vue-i18n";

export const defaultLocale = useLocalStorage("locale", "zh-cn").value;

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>("../../locales/*.y(a)?ml", { eager: true }))
    .map(([key, value]) => {
      const yaml = key.endsWith(".yaml");
      return [key.slice(14, yaml ? -5 : -4), value.default];
    }),
);
export default createI18n({
  legacy: false,
  locale: defaultLocale,
  messages,
});
