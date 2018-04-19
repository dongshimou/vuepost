import Vue from 'vue'
import Router from 'vue-router'
import resource from 'vue-resource'


import post_article from '@/pages/post_article'
import get_article from '@/pages/get_article'
import articles from '@/pages/articles'
Vue.use(resource)
Vue.use(Router)

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
      name:'post_article',
      component:post_article
    },
    {
      path:'/article/:title',
      name:'get-article',
      component:get_article
    },

  ]
})
