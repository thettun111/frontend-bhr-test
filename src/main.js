import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VModal)
Vue.use(VueApollo)
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://api-bhr.herokuapp.com/graphql'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
