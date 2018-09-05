import Vue from 'vue'
import Router from 'vue-router'
import resource from 'vue-resource'
Vue.use(resource)
Vue.use(Router)

import post_article from '@/pages/post_article'
import get_article from '@/pages/get_article'
import articles from '@/pages/articles'

import get_ss from '@/pages/get_ss'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'articles',
      component: articles
    },
    {
      path:'/article',
      name:'create_article',
      component:post_article
    },
    {
      path:'/article/:title',
      name:'get_article',
      component:get_article
    },
    {
      path:'/article/update/:title',
      name:'update_article',
      component:post_article
    },
    {
      path:'/ss',
      name:'get_ss',
      component:get_ss
    }

  ]
})
