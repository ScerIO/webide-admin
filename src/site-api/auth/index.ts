import IUser from 'site-api/user'

/**
 * Sign in by email
 */
export interface ISignIn {
  /**
   * Email
   * *
   * @type {string}
   */
  email: IUser['email']
}

/**
 * Sign up
 */
export interface ISignUp extends ISignIn {
  /**
   * First name
   * *
   * @type {string}
   */
  firstName: IUser['firstName']

  /**
   * Last name
   * *
   * @type {string}
   */
  lastName: IUser['lastName']

  /**
   * Avatar url
   */
  picture: IUser['picture']
}
