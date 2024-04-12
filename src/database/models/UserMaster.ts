import { Model, DataTypes, CreationOptional } from 'sequelize'
import { sequelize } from './sync-model'
import UserSecurityGroupMaster from './UserSecurityGroupMaster'
import * as bcrypt from 'bcrypt'

class UserMaster extends Model {
  declare id: CreationOptional<number>
  declare email: string
  declare password: string
  declare isActive: CreationOptional<boolean>
  declare userSecurityGroupMaster?: CreationOptional<UserSecurityGroupMaster[]>
}

UserMaster.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'UserMaster',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
    underscored: false,
    hasTrigger: false,
    defaultScope: {
      attributes: { exclude: [], include: [] },
    },
    hooks: {
      beforeSave: async (instance: UserMaster) => {
        instance.password = await bcrypt.hash(instance.password, 10)
      },
      beforeUpdate: async (instance: UserMaster) => {
        if (instance.changed('password')) {
          instance.password = await bcrypt.hash(instance.password, 10)
        } else {
          console.log('Password has not changed, not re-hashing.')
        }
      },
      afterSave: async (instance: UserMaster) => {},
      afterDestroy: async (instance: UserMaster) => {},
      beforeDestroy: async (instance: UserMaster) => {},
    },
  },
)

export default UserMaster
