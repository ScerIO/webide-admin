import gql from 'graphql-tag'

/**
 * Info about actual page
 */
export interface IPageInfo {
  /**
   * @type {boolean}
   */
  hasNextPage: boolean
  /**
   * @type {boolean}
   */
  hasPreviousPage: boolean
}

export interface IPaginationQueryOptions {
  /**
   * Nodes count
   * @type {boolean}
   */
  count: boolean
  /**
   * Nodes
   * @type {boolean}
   */
  nodes: boolean
  /**
   * Active page information
   * @type {boolean}
   */
  pageOnfo: boolean
}

/**
 * Page info fragment
 */
export const pageInfoFragment = gql`
  fragment PageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
  }
`
