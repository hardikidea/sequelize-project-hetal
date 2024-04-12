import { FindOptions } from 'sequelize'
import { TPaginationData } from '../types/TPaginationData.type'

interface IWrite<T> {
  create(item: Partial<T>): Promise<T>
  update(id: number, item: Partial<T>, isForce: boolean): Promise<number>
}

interface IDelete<T> {
  delete(options: FindOptions): Promise<number>
}

interface IRead<T> {
  find(option: FindOptions): Promise<T | null>
  findAll(option: FindOptions): Promise<T[]>
  findById(id: number): Promise<T | null>
  pagination(options: FindOptions): Promise<TPaginationData<T>>
}

export { IWrite, IRead, IDelete }
