import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '@/views/Home.vue'
import Middleware from '@/middlewares'
import AuthLayout from '@/components/layouts/auth/Layout'
import AppLayout from '@/components/layouts/app/Layout'
import PublicLayout from '@/components/layouts/public/Layout'
//import demandeRoutes from '@/modules/demandes/routes';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PublicLayout,
    children: [
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/public/About.vue'),
        meta: {
          middleware: [ Middleware.guest]
        }
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
        meta: {
          middleware: [ Middleware.guest]
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue'),
        meta: {
          middleware: [ Middleware.guest]
        }
      },
      {
        path: 'forgot-password',
        name: 'forgotPassword',
        component: () => import(/* webpackChunkName: "forgotPassword" */ '@/views/auth/ForgotPassword.vue'),
        meta: {
          middleware: [ Middleware.guest]
        }
      },
      {
        path: 'reset-password',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ '@/views/auth/ResetPassword.vue'),
        meta: {
          middleware: [ Middleware.guest]
        }
      },
      {
        path: 'active-compte',
        name: 'activeCompte',
        component: () => import(/* webpackChunkName: "activeCompte" */ '@/views/auth/ActiveCompte.vue'),
        meta: {
          middleware: [ Middleware.guest]
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'app',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/Dashboard.vue'),
        meta: {
          middleware: [ Middleware.auth]
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/app/Profile.vue'),
        meta: {
          middleware: [ Middleware.auth]
        }
      },
    ]
  },
  //...demandeRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//
function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if(!nextMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddle = nextCheck(context, middleware, index+1);

    nextMiddleware( {
      ...
      context, 
      next: nextMiddle
    })
  }
}

router.beforeEach( (to, from, next) => {
  if(to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const ctx = {
      from,
      next,
      router,
      to
    }

    const nextMiddleware = nextCheck(ctx, middleware, 1);

    return middleware[0]({
      ...ctx,
      next: nextMiddleware
    })
  }

  return next();
});

export default router
