import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ()=>import("@/pages/HomePage.vue"),
            children:[
                {
                    path: "",
                    name: "homeView",
                    component: ()=>import("@/views/HomeView.vue"),
                },{
                    path: "shushi",
                    component: () => import("@/views/Shushi.vue")
                }, {
                    path: "toten",
                    component: () => import("@/views/ToTen.vue")
                }
            ]
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=>import("@/pages/ErrorPage.vue") },

    ]
})

export default router
