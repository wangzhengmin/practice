import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Share from '../components/share/Share.vue'
  import Add from '../components/share/Add.vue'
import Login from '../components/public/Login.vue'
import Note from '../components/note/Note.vue'
  import Sort from '../components/note/Sort.vue'
  import Details from '../components/note/Details.vue'

import Self from '../components/self/Self.vue'
  import Pwd from '../components/self/Pwd.vue'
  import Info from '../components/self/Info.vue'
  import Account from '../components/self/Account.vue'
import Recommend from '../components/Recommend/Recommend.vue'
let routes=[
  {path:'/',component:Recommend},
  {path:'/share',component:Share},
  {path:'/share/add',component:Add},
  {path:'/login',component:Login},
  {path:'/note/new',component:Note,children:[
    {path:'/note/:sort',component:Sort}
  ]},
  {path:'/self',component:Self},
  {path:'/self/pwd',component:Pwd},
  {path:'/self/info',component:Info},
  {path:'/self/:account',component:Account},
  {path:'/other/:account',component:Account},
  {path:'/recommend',component:Recommend},
]

let router =  new VueRouter({
  routes
})

export default router;
