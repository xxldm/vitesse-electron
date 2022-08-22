import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { type RouterHistory, createRouter, createWebHashHistory, createWebHistory } from "vue-router";

export const routes = setupLayouts(generatedRoutes);

let history: RouterHistory;
if (isElectron) {
  /*
    WebHistory 疑似不支持对网站子路径(域名/子路径)相对路径(./路由)的路由访问,只支持绝对路径的访问,即参数base不支持(./)
    electron 因为使用file:// ,如果使用WebHistory,必须传入完整的安装目录,否路会导致访问路径丢失盘符路径信息
    如: file://d:/{安装路径}/ 访问 /main 路由 -> file:///main
    介于 electron 看不到URL, 所以直接使用 WebHashHistory
  */
  history = createWebHashHistory();
} else {
  // 网页版为了URL(美观or习惯),使用WebHistory
  history = createWebHistory(import.meta.env.BASE_URL);
}

const router = createRouter({
  history,
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
