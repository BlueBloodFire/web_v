import Vue from "vue";
import Router from 'vue-router'
import UserLogin from "@/views/login/UserLogin.vue";
import NewHome from "@/views/home/NewHome.vue";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'UserLogin',
            component: UserLogin,
            hidden: true
        },{
            path: '/home',
            name: 'NewHome',
            component: NewHome,
            hidden: true,
            meta: {
                roles: ['admin','user']
            }
        },
    ]
})
