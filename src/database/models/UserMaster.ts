import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { UserSecurityGroupMaster } from './index'

@Table({
  timestamps: true,
})
export default class UserMaster extends Model<UserMaster> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean

  @HasMany(() => UserSecurityGroupMaster)
  userSecurityGroups!: UserSecurityGroupMaster[]
}
