import { FindOptions } from 'sequelize'
import { TPaginationData } from '../types/TPaginationData.type'

export interface IWriteRepository<T> {
  createRecord(item: Partial<T>): Promise<T>
  updateRecord(id: number, item: Partial<T>): Promise<number>
}

export interface IDeleteRepository<T> {
  deleteRecord(option: FindOptions): Promise<number>
}

export interface IReadRepository<T> {
  fetchRecord(option: FindOptions): Promise<T | null>
  fetchAllRecord(option: FindOptions): Promise<T[]>
  fetchById(id: number): Promise<T | null>
  fetchPagination(page: number, limit: number): Promise<TPaginationData<T>>
}
