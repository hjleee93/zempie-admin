import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'

import VueApollo from "vue-apollo";
import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
  uri: "http://192.168.0.10:8299/graphql"
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
