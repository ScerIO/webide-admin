import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { PolymerApolloMixin } from 'polymer-apollo'

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost/api' }),
  cache: new InMemoryCache(),
})

export default (element) => PolymerApolloMixin({ apolloClient }, element)
