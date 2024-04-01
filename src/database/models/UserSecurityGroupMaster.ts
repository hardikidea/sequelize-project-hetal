import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserMaster, SecurityGroupMaster } from "./index"

@Table({
  timestamps: true,
})
export default class UserSecurityGroupMaster extends Model<UserSecurityGroupMaster> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => UserMaster)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => UserMaster)
  user!: UserMaster;

  @ForeignKey(() => SecurityGroupMaster)
  @Column(DataType.INTEGER)
  securityGroupId!: number;

  @BelongsTo(() => SecurityGroupMaster)
  securityGroup!: SecurityGroupMaster;
}
