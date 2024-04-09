
import { Service } from 'typedi';
import { UserMasterRepository } from '../repository';
import { UserMaster } from '../database/models';
import { IDeleteRepository, IReadRepository, IWriteRepository } from 'src/core/IGenricRepository.interface';
import { FindOptions } from 'sequelize';
import { TPaginationData } from 'src/core/generic.type';


@Service()
export class UserMasterService implements IWriteRepository<UserMaster>, IReadRepository<UserMaster>, IDeleteRepository<UserMaster> {

  constructor(private userMasterRepository: UserMasterRepository) {
  }
  async deleteRecord(option?: FindOptions): Promise<number> {
    return this.userMasterRepository.delete(option ?? {});
  }
  async fetchRecord(option?: FindOptions): Promise<UserMaster | null> {
    return await this.userMasterRepository.find(option ?? {});
  }
  async fetchAllRecord(option?: FindOptions): Promise<UserMaster[]> {
    return this.userMasterRepository.findAll(option ?? {});
  }
  async fetchById(id: number): Promise<UserMaster | null> {
    return this.userMasterRepository.findById(id);
  }
  async fetchPagination(page: number, limit: number): Promise<TPaginationData<UserMaster>> {
    const offset = (page - 1) * limit;
    const dataItems = await this.userMasterRepository.pagination({ limit, offset })
    return { ...dataItems, currentPage: page }
  }
  async createRecord(item: Partial<UserMaster>): Promise<UserMaster> {
    return await this.userMasterRepository.create(item);
  }
  async updateRecord(id: number, item: Partial<UserMaster>): Promise<[affectedCount: number]> {
    return await this.userMasterRepository.update(id, item);
  }

  async login(email: string, password: string) {
    return await this.userMasterRepository.login(email, password);
  }
}
