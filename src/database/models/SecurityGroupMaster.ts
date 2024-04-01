import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserSecurityGroupMaster } from './index';

@Table({
  timestamps: true,
})
export default class SecurityGroupMaster extends Model<SecurityGroupMaster> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @HasMany(() => UserSecurityGroupMaster)
  userSecurityGroup!: UserSecurityGroupMaster[];
}
