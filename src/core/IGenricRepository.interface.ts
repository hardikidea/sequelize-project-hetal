export interface IGenericRepository<T> {
    getInstance(): Promise<T>;
}