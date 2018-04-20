import gql from 'graphql-tag'
import {
  IPaginationQueryOptions,
  pageInfoFragment,
} from './pagination'

/**
 * News fragment
 */
export const newsFragment = gql`
  fragment News on NewsSchema {
    id
    title
    description
    content
    image
    timestamp
  }
`

/**
 * Get all news (Pagination)
 * @param options {IPaginationQueryOptions<INews>}
 */
export const allNews = (options: IPaginationQueryOptions) => gql`
  query ($offset: Int!, $limit: Int!) {
    news {
      all(offset: $offset, limit: $limit) {
        ${ options.count && 'count' }
        ${ options.nodes && 'nodes { ...News }' }
        ${ options.pageOnfo && 'pageInfo { ...PageInfo }' }
      }
    }
  }
  ${ options.nodes && newsFragment }
  ${ options.pageOnfo && pageInfoFragment }
`

/**
 * Add news
 */
export const addNews = gql`
  mutation ($token: String!,
            $image: String!,
            $title: String!,
            $description: String!,
            $content: String!,
            $shareVK: Boolean!) {
    news {
      add(token: $token,
          input: { image: $image,
                   title: $title,
                   description: $description,
                   content: $content,
                   shareVK: $shareVK }) {
        ...News
      }
    }
  }
  ${ newsFragment }
`
