import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/home/Home.vue')
const category = () => import('../views/category/Category.vue')
const profile = () => import('../views/profile/Profile.vue')
const shopcart = () => import('../views/shopcart/ShopCart.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:"",
    redirect:"/home"
  },
  {
    path:"/home",
    component:Home
  },
  {
    path:"/category",
    component:category
  },
  {
    path:"/profile",
    component:profile
  },
  {
    path:"/shopcart",
    component:shopcart
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
