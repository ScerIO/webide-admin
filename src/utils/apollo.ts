import { ApolloClient } from 'apollo-client'
import { PolymerElementType } from '@polymer/polymer/polymer-element'
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
      development: 'https://api.ide.scer.io/graphql', // 'http://localhost/graphql',
    }),
  }),
  cache: new InMemoryCache(),
})

export default (element) => PolymerApolloMixin({ apolloClient }, element) as PolymerElementType
