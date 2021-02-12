import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Settings from '../views/settings/Settings.vue'
import MenuControl from '../views/settings/MenuControl.vue';
import auth from '@/services/authService';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Crud-Vue-Front',
        component: Home,
        meta: {
            requiresAuth: true,
            transitionName: 'slide', //slide or fade
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          requiresAuth: false,
          transitionName: 'fade', //slide or fade
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            requiresAuth: true,
            transitionName: 'slide', //slide or fade
        }
    },
    {
        path: '/settings/menu',
        name: 'Menu Control',
        component: MenuControl,
        meta: {
            requiresAuth: true,
            transitionName: 'slide', //slide or fade
        }
    },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isUserLoggedIn = auth.isUserLoggedIn();

    //Checks if the page needs Login
    if(requiresAuth) {
        //Checks if the user is logged in
        if (!isUserLoggedIn) {
            next({
                path: '/login',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
