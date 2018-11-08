import {
  PolymerElement,
} from '@polymer/polymer/polymer-element'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { PolymerApolloMixin } from 'polymer-apollo'
import enviroment from 'utils/enviroment'

/**
 * Apollo client
 */
export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: enviroment({
      production: 'https://api.ide.scer.io/graphql',
      development: 'http://localhost:8086/graphql',
    }),
  }),
  cache: new InMemoryCache(),
})

export default (element: typeof PolymerElement): typeof PolymerElement => PolymerApolloMixin({ apolloClient }, element)
