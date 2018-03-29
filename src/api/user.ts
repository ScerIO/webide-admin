import gql from 'graphql-tag'

/**
 * User fragment
 */
export const userFragment = gql`
  fragment User on UserSchema {
    email
    isAdmin
    firstName
    lastName
    picture
  }
`
