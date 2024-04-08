import Vue from "vue";
import Router from 'vue-router'
import UserLogin from "@/views/login/UserLogin.vue";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'UserLogin',
            component: UserLogin
        }
    ]
})