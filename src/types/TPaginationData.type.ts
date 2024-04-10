export type TPaginationData<T> = {
  currentPage?: number | undefined
  totalPages: number
  count: number
  rows: T[]
}
