import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'

import VueApollo from "vue-apollo";
import ApolloClient from 'apollo-boost';

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_LINK
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.config.productionTip = false

Vue.use(VueApollo);

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
