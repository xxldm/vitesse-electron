<template>
  <el-menu mode="horizontal" router :default-active="defaultActive">
    <el-menu-item
      v-for="route in useRouterStore().routes_menu"
      :key="route.path"
      :index="route.path"
    >
      {{ t(`menu.${route.children![0].name?.toString()}`) }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
const defaultActive = computed(() => useRoute().path);
const { t } = useI18n();
</script>
