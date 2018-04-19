// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import mavonEditor from 'mavon-editor'
import ToggleButton from 'vue-js-toggle-button';
import VueImg from 'v-img';

import 'mavon-editor/dist/css/index.css'
import './assets/animate.min.css'
import './assets/icons.css'
// import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueImg);

Vue.use(ToggleButton)
Vue.use(mavonEditor)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
