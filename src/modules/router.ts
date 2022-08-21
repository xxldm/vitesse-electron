import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { createRouter, createWebHistory } from "vue-router";

export const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * 进度条配置
 */
router.beforeEach((to, from) => {
  if (to.path !== from.path) {
    useNProgress().isLoading.value = true;
  }
});
router.afterEach(() => {
  useNProgress().isLoading.value = false;
});
/**
 * pwa 配置
 */
router.isReady().then(async () => {
  const { registerSW } = await import("virtual:pwa-register");
  registerSW({ immediate: true });
});

export default router;
