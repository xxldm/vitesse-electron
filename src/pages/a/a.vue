<template>
  <div text-center>
    <div w-60 mx-auto mb-5>
      <el-input v-model="q" placeholder="查询关键字" />
    </div>
    <el-button :loading="result.isLoading" @click="search">
      查询 github 仓库
    </el-button>
    <div>
      {{ result.data }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const q = $ref("antfu");
const result = $ref(useAxios());
const search = () => {
  result.execute(`https://api.github.com/search/repositories?q=${q}&per_page=10`);
};
</script>

<route lang="yaml">
name: a
</route>
