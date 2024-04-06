import { FindOptions } from "sequelize";

export interface IRepository<T> {
  find(): Promise<T | null>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(item: Partial<T>): Promise<T>;
  update(id: number, item: Partial<T>): Promise<[affectedCount: number]>;
  delete(id: number): Promise<number>;
  findAndCountAll(options: FindOptions): Promise<{ rows: T[]; count: number }>;
}
