import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueSession) // 이제부터 세션 스토리지를 사용할 수 있게 되었다.
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
