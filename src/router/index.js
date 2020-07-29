import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store.js'
import {HTTP} from '@/main'

import Login from '@/components/Login'
import MainView from '@/components/MainView'
import Selectors from '@/components/Selectors'
import Selector from '@/components/Selector'
import SelectorsAdd from '@/components/SelectorsAdd'
import SelectorsImport from '@/components/SelectorsImport'
import Rules from '@/components/Rules'
import Users from '@/components/Users'
import UsersAdd from '@/components/UsersAdd'
import Modules from '@/components/Modules'
import ModulesAdd from '@/components/ModulesAdd'
import Configs from '@/components/Configs'
import Config from '@/components/Config'
import Metas from '@/components/Metas'
import Meta from '@/components/Meta'
import Services from '@/components/Services'
import Sytems from '@/components/Systems'
import Processes from '@/components/Processes'
import Input from '@/components/Input'
import Results from '@/components/Results'
import Result from '@/components/Result'
import Notes from '@/components/Notes'
import Log from '@/components/Log'
import Datasets from '@/components/Datasets'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'main',
      component: MainView,
      meta:{
          requiresAuth: true
      },
      children: [
        {
            path:'selectors',
            component: Selectors
        },
        {
            path:'selectors/:id',
            component: Selector,
            name: 'selector'
        },
        {
            path:'selectors/:id/rules',
            component: Rules,
            name: 'rules'
        },
        {
            path:'selectors/import',
            component: SelectorsImport,
            name: 'selectorsimport'
        },
        {
            path:'selectors/add',
            component: SelectorsAdd,
            name: 'selectorsadd'
        },
        {
            path:'users',
            component: Users
        },
        {
            path:'users/add',
            component: UsersAdd
        },
        
        {
            path:'modules',
            component: Modules   
        },
        {
            path:'modules/add',
            component: ModulesAdd   
        },
        {
            path:'configs',
            component: Configs   
        },
        {
            path:'configs/:id',
            component: Config,
            name: 'config'
        },
        {
            path:'metas/',
            component: Metas
        },
        {
            path:'metas/:id',
            component: Meta,
            name: 'meta'
        },
        {
            path:'services',
            component: Services
        },
        {
            path:'systems',
            component: Sytems
        },
        {
            path:'processes',
            component: Processes
        },
        {
            path:'processes/:id/input',
            component: Input,
            name: 'input'
        },
        {
            path:'results',
            component: Results
        },
        {
            path:'results/:id',
            component: Result,
            name: 'result'
        },
        {
            path:':type/:id/log',
            component: Log,
            name:'log'
        },
        {
            path:'datasets',
            component: Datasets   
        },
        {
            path:'datasets/:id/notes',
            component: Notes,
            name: 'notes'
        }
      ]
    }
  ]
})

var checked=false;

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('WADtoken') == null || localStorage.getItem('WADuser') == null){
            // console.log('token or user missing in localstorage')
            next('/login')
        } else if (store.getters.isLoggedIn){
            // console.log('store says logged in')
            next()
        } else {
            // console.log('token or user in localstorage, putting then in store')
            var token = localStorage.getItem('WADtoken')
            var user = JSON.parse(localStorage.getItem('WADuser'))
            store.commit('auth_success',{token:token,user:user})
            HTTP.defaults.headers['Authorization'] = 'JWT '+token
            next()
        }
    } else {
        // console.log('no auth required')
        next()
    }
})

export default router

