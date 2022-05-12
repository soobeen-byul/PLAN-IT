import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import TodoLogin from '../components/TodoLogin'
import TodoContents from '../components/TodoContents'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: TodoLogin },
        { path: '/todo', component: TodoContents },
        { path: '*', component: TodoLogin }
    ]
})

export default router