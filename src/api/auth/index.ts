import gql from 'graphql-tag'
import { userFragment } from '../user'

/**
 * Auth by service token
 */
export const tokenAuth = gql`
  mutation ($token: String!) {
    auth {
      signIn(token: $token) {
        ...User
      }
    }
  }
  ${userFragment}
`
