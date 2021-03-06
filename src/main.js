// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import mavonEditor from 'mavon-editor'
import ToggleButton from 'vue-js-toggle-button';
// import VueImg from 'v-img';
// Vue.use(VueImg)

// import RouterNav from 'vue-router-nav'
// Vue.use(RouterNav)

// import LoadMore from 'vue-scroll-loadmore'
// Vue.use(LoadMore)

// import Pin from 'vue-pin'
// Vue.use(Pin)
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
Vue.use(VueNoty,{
  timeout:3000,
  layout:'topRight'
})

import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import 'mavon-editor/dist/css/index.css'
import 'font-awesome/css/font-awesome.min.css'

// import '@/assets/animate.min.css'

import '@/assets/button.css'
import '@/assets/common.css'
import '@/assets/layout.scss'

Vue.use(ToggleButton)
Vue.use(mavonEditor)
Vue.config.productionTip = false

import Moment from 'moment'
Vue.prototype.moment = Moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


