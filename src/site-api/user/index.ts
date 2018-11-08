import IBase from 'site-api/base'
import { Role } from 'site-api/user/role'

/**
 * User
 */
export default interface IUser extends IBase {
  /**
   * Email
   * *
   * @type {string}
   */
  email: string

  /**
   * Role
   * *
   * @type {Role}
   */
  role?: Role

  /**
   * Acess key
   * *
   * @type {string}
   */
  token?: string

  /**
   * First name
   * *
   * @type {string}
   */
  firstName?: string

  /**
   * Last name
   * *
   * @type {string}
   */
  lastName?: string

  /**
   * Avatar url
   * *
   * @type {string}
   */
  picture?: string

  /**
   * User is admin
   */
  isAdmin: boolean
}
