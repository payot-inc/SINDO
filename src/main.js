import Vue from 'vue';
import './plugins/bootstrap-vue';
import './plugins/axios';
import './plugins/moment';
import './plugins/numeral';
import './plugins/lodash';
import './plugins/serialport';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
