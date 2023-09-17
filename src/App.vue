<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
    <div class="links">
        <RouterLink to="/">主页</RouterLink>
        <RouterLink to="/shushi">进制转换竖式生成</RouterLink>
        <RouterLink to="/toten">转十进制表达式生成</RouterLink>
        <RouterLink to="/negative1">负数转二进制</RouterLink>
        <RouterLink to="/negative2">负二进制转10进制</RouterLink>
    </div>

    <RouterView></RouterView>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.links {
    margin: 20px 5px;
}

.links>* {
    margin: 0 5px;
}
</style>
