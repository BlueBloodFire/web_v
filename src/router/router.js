import Vue from "vue";
import Router from 'vue-router'
import UserLogin from "@/views/login/UserLogin.vue";
import NewHome from "@/views/home/NewHome.vue";
import GoChat from "@/views/home/GoChat.vue";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'UserLogin',
            component: UserLogin
        },{
            path: '/home',
            name: 'NewHome',
            component: NewHome
        },{
            path: '/chat',
            name: 'GoChat',
            component: GoChat
        }
    ]
})
