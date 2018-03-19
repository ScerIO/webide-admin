import gql from 'graphql-tag'
import IUser from '../../../api/src/api/user/interface'

/**
 * User fragment
 */
export const userFragment = gql`
  fragment User on UserSchema {
    token
    email
    isAdmin
    firstName
    lastName
    picture
  }
`

export {
  IUser,
}
