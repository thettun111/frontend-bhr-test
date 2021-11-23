import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import EmployeeList from '@/components/Employer'
import Login from '@/components/Login'
import Detail from '@/components/EmployeeDetail'
import Edit from '@/components/EmployeeEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: EmployeeList
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/employee-detail/:id',
    name: 'Detail',
    component: Detail,
    props: true
  },
  {
    path: '/employee-edit/:id',
    name: 'Edit',
    component: Edit,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
