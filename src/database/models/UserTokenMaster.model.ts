import { Model, DataTypes, CreationOptional } from 'sequelize'
import { sequelize } from './sync-model'

class UserTokenMaster extends Model {
  declare id: CreationOptional<number>
  declare userId: number
  declare token: string
  declare expiredOn: Date
  declare tokenType: Number
  declare isActive: CreationOptional<boolean>
}

UserTokenMaster.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    expiredOn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tokenType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'UserTokenMaster',
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
      beforeSave: async (instance: UserTokenMaster) => {},
      afterSave: async (instance: UserTokenMaster) => {},
      afterDestroy: async (instance: UserTokenMaster) => {},
      beforeDestroy: async (instance: UserTokenMaster) => {},
    },
  },
)

export default UserTokenMaster
