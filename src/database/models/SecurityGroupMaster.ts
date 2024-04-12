import { Model, DataTypes, CreationOptional } from 'sequelize'
import { sequelize } from './sync-model'
import UserSecurityGroupMaster from './UserSecurityGroupMaster'

class SecurityGroupMaster extends Model {
  declare id: CreationOptional<number>
  declare name: string
  declare description: string
  declare isActive: CreationOptional<boolean>
  declare userSecurityGroupMaster?: CreationOptional<UserSecurityGroupMaster[]>
}

SecurityGroupMaster.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'SecurityGroupMaster',
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
      // where: { isActive: true },
    },
    hooks: {
      beforeSave: async (instance: SecurityGroupMaster) => {},
      afterSave: async (instance: SecurityGroupMaster) => {},
      afterDestroy: async (instance: SecurityGroupMaster) => {},
      beforeDestroy: async (instance: SecurityGroupMaster) => {},
    },
  },
)

export default SecurityGroupMaster
