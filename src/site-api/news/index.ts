import IBase from 'site-api/base'

/**
 * News interface
 */
export default interface INews extends IBase {
  /**
   * Image url
   * *
   * @type {string}
   */
  image: string
  /**
   * Title
   * *
   * @type {string}
   */
  title: string
  /**
   * Description
   * *
   * @type {string}
   */
  description: string
  /**
   * Content
   * *
   * @type {string}
   */
  content: string
  /**
   * Created date
   * *
   * @type {string}
   */
  timestamp: string
}
