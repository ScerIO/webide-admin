export default interface IBase {
  /**
   * Entity ID
   */
  id?: string
}

export interface IPagination<T> {
  count: number,
  nodes: T[],
  pageInfo: {
    hasNextPage: boolean,
    hasPreviousPage: boolean,
  },
}
