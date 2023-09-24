<script setup>
import { RouterView, RouterLink } from 'vue-router'
import {ElMenuItem, ElSubMenu} from "element-plus";
import router from "@/router/index.js";

const menus = [
    { "title": "首页", "icon": "fi-rr-home", "path": "/" },
    { "title": "八位一分组", "icon": "fi-rr-books", "path": "/split8" },
    {
        "title": "第二章", "icon": "fi-rr-followcollection", "path": "c2",
        "children": [
            { "title": "进制转换竖式", "icon": "fi-rr-capsules", "path": "/shushi" },
            { "title": "转十进制表达式", "icon": "fi-rr-memo", "path": "/toten" },
            { "title": "负数转二进制", "icon": "fi-rr-capsules", "path": "/negative1" },
            { "title": "负二进制转10进制", "icon": "fi-rr-memo", "path": "/negative2" },
            { "title": "表达式计算栈", "icon":"", "path": "/calcStack"}
        ]
    },
]

const getSidebarPath = () => {
    let path = router.currentRoute.value.path.split("/")
    if (path.length === 1) {
        return ""
    } else {
        return "/" + path[1];
    }
}

const menuItemClick = (ke) => {
    router.push(ke.index)
}
</script>

<template>
    <div class="wrapper">
        <el-container>
            <el-aside width="200px" style=" height: 100vh">
                <el-menu :default-active="getSidebarPath()" class="sideBarMenu" ref="menu">
                    <component v-for="item in menus" :is="item.children ? ElSubMenu : ElMenuItem" :index="item.path"
                               v-on="item.children ? {} : { click: menuItemClick }">
                        <template #title>
                            <i class="fi" :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item v-if="item.children" v-for="child in item.children" :index="child.path"
                                      @click="menuItemClick">
                            <span>{{ child.title }}</span>
                        </el-menu-item>
                    </component>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main class="viewWrapper">
                    <div>
                        <RouterView></RouterView>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>


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

.wrapper {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    min-width: 800px;
}

.viewWrapper {
    margin: auto;
    overflow-y: auto;
    max-height: 100vh;
}

.el-menu {
    height: 100%;
}
</style>
