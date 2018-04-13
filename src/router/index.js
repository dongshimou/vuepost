import Vue from 'vue'
import Router from 'vue-router'
import resource from 'vue-resource'


import post_article from '@/pages/post_article'
import get_article from '@/pages/get_article'


Vue.use(resource)
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/article',
      name:'post_article',
      component:post_article
    },
    {
      path:'/test',
      name:'get-article',
      component:get_article
    }
  ]
})
