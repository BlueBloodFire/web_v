import Vue from "vue";
import Router from 'vue-router'
import UserLogin from "@/views/login/UserLogin.vue";
import NewHome from "@/views/home/NewHome.vue";
import NewTest1 from "@/views/home/NewTest1.vue";
import NewTest2 from "@/views/home/NewTest2.vue";

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
            hidden: true
        },{
            path: '/home',
            name: 'NewHome',
            component: NewHome,
            children: [
                {
                    path: '/test1',
                    name: 'NewTest1',
                    component: NewTest1
                },
                {
                    path: '/test2',
                    name: 'NewTest2',
                    component: NewTest2
                }
            ]
        },
    ]
})
