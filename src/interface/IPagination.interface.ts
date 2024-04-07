export interface IPagination<T> {
  currentPage?: number
  totalPages: number
  count: number
  rows: T[]
}
