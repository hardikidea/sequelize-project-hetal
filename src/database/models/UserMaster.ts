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

  // Method to compare provided password with the hashed one
  verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'UserMaster',
    freezeTableName: true,
    // paranoid: true, // Enable "soft deletes" for this model.
    defaultScope: {
      // attributes: { exclude: ['password'] },
      where: { isActive: true },
    },
    hooks: {
      beforeSave: async (user: UserMaster) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10)
        }
      },
    },
  },
)

export default UserMaster
